import React, { useCallback, useState } from "react";
import { Flex, Text, Box, Input, Card, Button, theme } from "sriracha-ui";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../config/firebase";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import {
  editUserMutation,
  unSubUserMutation,
  regenTokenMutation,
} from "../../../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadStripe } from "@stripe/stripe-js";
import copy from "copy-to-clipboard";

interface SettingsProps {
  user: any;
  toggle: () => any;
}

export default function Settings({ user, toggle }: SettingsProps) {
  const { handleSubmit, register } = useForm();
  const [editUser] = useMutation(editUserMutation);
  const [unSubUser] = useMutation(unSubUserMutation);
  const [regenToken] = useMutation(regenTokenMutation);

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const stripePromise = loadStripe(String(process.env.REACT_APP_STRIPE_PK));

  const handleClick = async () => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe: any = await stripePromise;
    await stripe.redirectToCheckout({
      lineItems: [{ price: process.env.REACT_APP_STRIPE_CMS_SUB, quantity: 1 }],
      mode: "subscription",
      successUrl: process.env.REACT_APP_STRIPE_SUCCESS_URL,
      cancelUrl: process.env.REACT_APP_STRIPE_CANCEL_URL,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    await storage.ref(`/images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
    await storage
      .ref("images")
      .child(acceptedFiles[0].name)
      .getDownloadURL()
      .then((fireBaseUrl: string) => {
        setImage(fireBaseUrl);
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function onSubmit(data: any) {
    await editUser({
      variables: {
        data: {
          id: user.id,
          username: data.username ? data.username : user.username,
          email: user.email,
          avatar: image ? image : user.avatar,
        },
      },
    });
    toggle();
  }

  async function copyText() {
    copy(user.token);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <Card>
      <Flex as="form" drape w="35rem" onSubmit={handleSubmit(onSubmit)}>
        <Text as="label" htmlFor="username">
          Username...
        </Text>
        {edit ? (
          <Flex aic>
            <Input
              name="username"
              ref={register}
              defaultValue={user.username}
            />
            <Box
              onClick={() => setEdit(false)}
              ml="1rem"
              color="red6"
              hvrColor="red8"
            >
              <FontAwesomeIcon icon="window-close" size="lg" />
            </Box>
          </Flex>
        ) : (
          <Flex aic>
            <Text bold lf>
              {user.username}
            </Text>
            <Box w="1rem" />
            <Box mt="0.4rem" hvrColor="gary6" onClick={() => setEdit(true)}>
              <FontAwesomeIcon icon="edit" />
            </Box>
          </Flex>
        )}

        <Text as="label" htmlFor="avatar" m="2rem 0">
          Profile image...
        </Text>
        {image ? (
          <Flex drape>
            <Box maxW="25rem">
              <img src={image} alt="preview" />
            </Box>
          </Flex>
        ) : loading ? (
          <Card invert>
            <FontAwesomeIcon icon="spinner" spin />
          </Card>
        ) : (
          <Flex
            {...getRootProps()}
            border={`0.2rem dashed ${theme.colors.gray6}`}
            hvrBorder={`0.2rem dashed ${theme.colors.gray4}`}
            sqr="10rem"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Flex>
        )}
        {user.subscriber ? (
          <Button
            red
            type="button"
            onClick={() => {
              unSubUser({
                variables: {
                  id: user.id,
                },
              });
            }}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button green type="link" onClick={handleClick}>
            Subscribe
          </Button>
        )}
        {user.subscriber ? (
          <>
            <Button pink type="button" onClick={() => setReveal(!reveal)}>
              Reveal Token
            </Button>
            {reveal ? (
              <Flex
                drape
                p="0.4rem"
                border={
                  copied
                    ? `0.2rem solid ${theme.colors.green6}`
                    : `0.2rem solid ${theme.colors.gray4}`
                }
                hvrBorder={
                  copied
                    ? `0.2rem solid ${theme.colors.green6}`
                    : `0.2rem solid ${theme.colors.gray4}`
                }
              >
                <Flex jce stretch>
                  <Text bold>{copied ? "Copied" : "Copy"}</Text>
                  <Box
                    m="0.4rem"
                    bg="blue6"
                    color="gary1"
                    radius="0.4rem"
                    w="2.2rem"
                    pointer
                    onClick={copyText}
                  >
                    <FontAwesomeIcon icon="copy" />
                  </Box>
                </Flex>
                <Text
                  bold
                  p="0.2rem 0.4rem"
                  bg="gray9"
                  color="gray1"
                  radius="0.4rem"
                >
                  {user.token}
                </Text>

                <Button
                  as="div"
                  red
                  onClick={async () => {
                    await regenToken({
                      variables: {
                        id: user.id,
                      },
                    });
                  }}
                >
                  Regenerate Token
                </Button>
                <Text size="sm">
                  Only regenerate your token if you feel that is has been
                  compromised.
                </Text>
              </Flex>
            ) : null}
          </>
        ) : null}
        {user.subscriber ? (
          <Text
            as="a"
            pointer
            href="https://dev.to/jimmymcbride/best-markdown-cms-4dmg"
          >
            CMS Documentation
          </Text>
        ) : null}
        <Button amber type="green" m="2rem 0">
          Save changes...
        </Button>
      </Flex>
    </Card>
  );
}
