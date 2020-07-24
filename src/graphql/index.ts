import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation($data: UserInput!) {
    login(data: $data) {
      id
      username
      email
      avatar
      subscriber
      token
    }
  }
`;

export const editUserMutation = gql`
  mutation($data: UserInput!) {
    editUser(data: $data) {
      id
      username
      email
      avatar
      subscriber
      token
    }
  }
`;

export const subUserMutation = gql`
  mutation($id: ID!) {
    subUser(id: $id) {
      id
      username
      email
      avatar
      subscriber
      token
    }
  }
`;

export const unSubUserMutation = gql`
  mutation($id: ID!) {
    unSubUser(id: $id) {
      id
      username
      email
      avatar
      subscriber
      token
    }
  }
`;

export const getMyFilesQuery = gql`
  query($userId: String!) {
    getFiles(userId: $userId) {
      id
      title
      slug
      body
      date
      updatedAt
    }
  }
`;

export const getUserQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      email
      avatar
      subscriber
      token
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

export const getFileBySlugQuery = gql`
  query($data: GetBySlugInput!) {
    getFileBySlug(data: $data) {
      id
      title
      slug
      body
      date
      updatedAt
    }
  }
`;

export const getPubFileBySlugQuery = gql`
  query($data: GetBySlugInput!) {
    getPubFileBySlug(data: $data) {
      id
      title
      slug
      body
      description
      thumbnail
      publishedOn
      updatedAt
    }
  }
`;

export const addNewFileMutation = gql`
  mutation($data: NewFileInput!) {
    addFile(data: $data) {
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
      date
      updatedAt
    }
  }
`;

export const deleteFileMutation = gql`
  mutation($id: ID!) {
    deleteFile(id: $id)
  }
`;

export const unPublishFileMutation = gql`
  mutation($id: ID!) {
    unPublishFile(id: $id)
  }
`;

export const publishFileMutation = gql`
  mutation($data: PubFileInput!) {
    publishFile(data: $data) {
      id
      title
      slug
      body
      description
      thumbnail
      publishedOn
      updatedAt
    }
  }
`;

export const isFilePubQuery = gql`
  query($id: ID!) {
    isFilePub(id: $id)
  }
`;

export const getPubFilesQuery = gql`
  query($userId: ID!) {
    getPubFiles(userId: $userId) {
      id
      title
      slug
      body
      description
      thumbnail
      publishedOn
      updatedAt
    }
  }
`;

export const getPubFileQuery = gql`
  query($id: ID!) {
    getPubFile(id: $id) {
      id
      title
      slug
      body
      description
      thumbnail
      publishedOn
      updatedAt
    }
  }
`;
