import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      password
      email
    }
  }
`;

export const REGISTER_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInputDTO!) {
    createUser(createUserInput: $createUserInput) {
      email
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id: _id
      title
      content
      author {
        email
      }
      hasLiked
      numberOfLikes
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      title
      content
      author {
        email
      }
      hasLiked
      numberOfLikes
    }
  }
`;

export const GET_COMMENTS_BY_POST_ID = gql`
  query GetCommentsByPostId($postId: ID!) {
    comments(postId: $postId) {
      id: _id
      content
      author {
        email
      }
      createdAt
      hasLiked
      numberOfLikes
    }
  }
`;

export const GET_MOST_LIKED_COMMENT = gql`
  query {
    mostLikedComment {
      id: _id
      content
      likes {
        email
      }
    }
  }
`;

export const GET_NUMBER_OF_COMMENTS = gql`
  query GetNumberOfComments($postId: ID!) {
    numberOfComments(postId: $postId)
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $postId: ID!, $authorId: ID!) {
    createComment(
      createCommentInput: {
        content: $content
        postId: $postId
        authorId: $authorId
      }
    ) {
      id: _id
    }
  }
`;

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($postId: ID!, $userId: ID!) {
    togglePostLike(postId: $postId, userId: $userId) {
      id: _id
    }
  }
`;

export const TOGGLE_COMMENT_LIKE = gql`
  mutation ToggleCommentLike($commentId: ID!) {
    toggleCommentLike(commentId: $commentId) {
      id: _id
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: String!) {
    createPost(
      createPostInput: { title: $title, content: $content, authorId: $authorId }
    ) {
      id: _id
      title
      content
      author {
        email
      }
    }
  }
`;
