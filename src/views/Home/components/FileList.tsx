import React, { useState } from "react";
import Loading from "./Loading";
import {
  Card,
  Text,
  Modal,
  Button,
  Form,
  Input,
  Box,
  useModal,
  theme,
} from "sriracha-ui";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  getMyFilesQuery,
  addNewFileMutation,
  deleteFileMutation,
  unPublishFileMutation,
  getPubFilesQuery,
  getPubFileQuery
} from "../../../graphql";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FileList() {
  const uid = useSelector((state: any) => state.auth?.uid);
  const history = useHistory();
  const [currFileId, setCurrFileId] = useState("");
  const { data, loading } = useQuery(getMyFilesQuery, {
    variables: {
      userId: uid,
    },
  });
  
  // query for pub file data
  const { data: pubFileData } = useQuery(getPubFilesQuery, {
    variables: {
      userId: uid,
    },
  });

  // data from pub files as array of ids 
  const publishedFilesId = pubFileData && pubFileData.getPubFiles.map((pubfiles: any) =>{
    return pubfiles.id
  })
  
  // publishedFilesId && console.log('published files ids', publishedFilesId)

  // get pub file by id 
  const { data: pubFileVersion } = useQuery(getPubFileQuery, {
    variables: {
      id: uid,
    },
  });
   
  
  const [addFile] = useMutation(addNewFileMutation);
  const [deleteFile] = useMutation(deleteFileMutation);
  const [unPublishFile] = useMutation(unPublishFileMutation);
  const { handleSubmit, register } = useForm();

  const { isModal, toggleModal } = useModal();
  const { isModal: isDeleteModal, toggleModal: toggleDeleteModal } = useModal();



  async function onSubmit({ title }: any) {
    const { data } = await addFile({
      variables: {
        data: {
          title,
          userId: uid,
          body: `# ${title} \n\n`,
        },
      },
      refetchQueries: [{ query: getMyFilesQuery, variables: { userId: uid } }],
    });
    history.push(`/file/${data?.addFile?.slug}`);
  }

  // attempting to pass in id of file that has a published version.. 
  // not sure how to do it or if logic flow makes sense. this function was meant to be called from line 115 if published version exists
  function getPubFileContent(id: any) {
    console.log('published version', id )
    const data =  [{ query: pubFileVersion, variables: { id: id } }]
    console.log('d', data)
  }

  if (loading) return <Loading />;
  return (
    <>
      <Card w="40rem" maxW="94vw" shade>
        <Button green sink onClick={toggleModal}>
          Add New File
        </Button>
        {data?.getFiles.map((file: any) => (
          <Card
            radius="0.5rem"
            bg={theme.colors.gray4}
            key={file.id}
            stretch
            sink
            pointer
            across
            jcEvenly
            aiCenter
            taLeft
          >
            {console.log('is file published?', publishedFilesId.includes(file.id))}
             {/* is this file's id in pubfile query data ?          ?  call function to get content */}  
            {publishedFilesId && publishedFilesId.includes(file.id) ?  getPubFileContent(file.id) :
            <FontAwesomeIcon icon="file-alt" /> }
            <Box w="1rem" />
            <Text
              bold
              as="a"
              color={theme.colors.gray9}
              hvrColor={theme.colors.gray7}
              href={`/file/${file.slug}`}
              stretch
              pointer
            >
              {file.title}
            </Text>
            <Box
              onClick={() => {
                toggleDeleteModal();
                setCurrFileId(file.id);
              }}
              visible
              pointer
              color={theme.colors.red6}
              hvrColor={theme.colors.red9}
            >
              <FontAwesomeIcon icon="window-close" size="lg" />
            </Box>
          </Card>
        ))}
      </Card>
      <Modal active={isModal} toggle={toggleModal}>
        <Card>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Text as="label" lg>
              Title for your new file:
            </Text>
            <Input
              type="text"
              name="title"
              autoFocus
              ref={register}
              placeholder="Title"
            />
            <Button type="submit" blue>
              Create
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal active={isDeleteModal} toggle={toggleDeleteModal}>
        <Card>
          <Text>Are you sure you want to delete this file?</Text>
          <Button
            red
            onClick={async () => {
              await deleteFile({
                variables: {
                  id: currFileId,
                },
                refetchQueries: [
                  { query: getMyFilesQuery, variables: { userId: uid } },
                ],
              });
              await unPublishFile({
                variables: {
                  id: currFileId,
                },
                refetchQueries: [
                  { query: getPubFilesQuery, variables: { userId: uid } },
                ],
              });
              toggleDeleteModal();
            }}
          >
            Delete
          </Button>
          <Button blue onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </Card>
      </Modal>
    </>
  );
}
