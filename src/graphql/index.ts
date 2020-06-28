import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation($data: LoginInput!) {
    login(data: $data) {
      id
      username
      email
    }
  }
`;

export const registerMutation = gql`
  mutation($data: RegisterInput!) {
    register(data: $data) {
      id
      username
      email
    }
  }
`;

export const isAuthQuery = gql`
  query {
    isAuth
  }
`;

export const logoutMutation = gql`
  mutation {
    logout
  }
`;

export const getMyFilesQuery = gql`
  query {
    getFiles {
      id
      title
      slug
      body
      date
      updatedAt
    }
  }
`;

export const getFileQuery = gql`
  query($slug: String!) {
    getFile(slug: $slug) {
      id
      title
      slug
      body
      date
      updatedAt
    }
  }
`;

export const addNewFileMutation = gql`
  mutation($title: String!) {
    addFile(title: $title) {
      id
      title
      slug
      body
      date
      updatedAt
    }
  }
`;

export const editFileMutation = gql`
  mutation($data: EditFileInput!) {
    editFile(data: $data) {
      id
      title
      slug
      body
    }
  }
`;

export const deleteFileMutation = gql`
  mutation($title: String!) {
    deleteFile(title: $title)
  }
`;
