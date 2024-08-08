import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  GET_NUMBER_OF_COMMENTS,
  GET_POST_BY_ID,
  TOGGLE_POST_LIKE,
} from '../../shared/queries';
import { Post } from '../../shared/types';

type PostQuery = {
  post: Post;
};

export const PostPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const email = localStorage.getItem('email');

  const [likePost] = useMutation(TOGGLE_POST_LIKE);
  const {
    loading: postLoading,
    error: postError,
    data: postData,
    refetch: refetchPost,
  } = useQuery<PostQuery>(GET_POST_BY_ID, {
    variables: { id },
  });

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { postId: id },
  });

  const {
    loading: countLoading,
    error: countError,
    data: countData,
  } = useQuery(GET_NUMBER_OF_COMMENTS, {
    variables: { postId: id },
  });

  const [addComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS_BY_POST_ID, variables: { postId: id } },
      { query: GET_NUMBER_OF_COMMENTS, variables: { postId: id } },
    ],
  });

  const toggleLike = async (postId: string) => {
    try {
      await likePost({
        variables: { postId: postId, userId: localStorage.getItem('id') },
      });
      await refetchPost();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment({
        variables: {
          content: newComment,
          postId: id,
          authorId: localStorage.getItem('id'),
        },
      });
      setNewComment('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (postLoading || commentsLoading || countLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  if (postError || commentsError || countError)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error while fetching this post</span>
      </div>
    );

  const { title, content, author, hasLiked, numberOfLikes } =
    postData?.post || {};
  const numberOfComments = countData?.numberOfComments || 0;
  const comments = commentsData?.comments || [];

  return (
    <>
      <div className="card bg-base-100 w-100">
        <div className="card-body">
          <h2 className="text-lg font-medium mb-2">{title}</h2>
          <p className="text-sm font-light mb-2">{author?.email}</p>
          <p>{content}</p>
          <div className="flex mt-5 gap-5">
            <button
              disabled={!email}
              className={
                hasLiked ? 'btn btn-success' : 'btn btn-outline btn-accent'
              }
              onClick={() => toggleLike(id as string)}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                />
              </svg>
              <span>{numberOfLikes}</span>
            </button>
            <button
              disabled={!email}
              className="btn btn-accent w-48"
              onClick={() => setIsModalOpen(true)}
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="card bg-base-100 w-100">
        <div className="card-body">
          <h3 className="text-lg font-medium mb-2">
            Comments ({numberOfComments})
          </h3>
          {comments.map((comment: any) => (
            <div key={comment._id} className="border p-4 mt-4">
              <p>{comment.content}</p>
              <p className="text-sm font-light mt-2">{comment.author.email}</p>
              <p className="text-xs font-light mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Comment</h3>
            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="Your comment"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddComment}>
                Submit
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
