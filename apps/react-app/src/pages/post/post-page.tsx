import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_COMMENT,
  GET_COMMENTS_BY_POST_ID,
  GET_NUMBER_OF_COMMENTS,
  GET_POST_BY_ID,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_POST_LIKE,
} from '../../shared/queries';
import { Comment, Post } from '../../shared/types';
import { CommentsSection } from '../../components/comments/comment-section';
import { LikeIcon } from '../../components/Icons/like-icon';

type PostQuery = {
  post: Post;
};

/*
Possible improvements:
- Merge loading states
- Make one reusable button with icon, label, onclick etc,
- ...
 */

export const PostPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const email = localStorage.getItem('email');

  const [likePost] = useMutation(TOGGLE_POST_LIKE);
  const [likeComment] = useMutation(TOGGLE_COMMENT_LIKE);
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
    refetch: refetchComments,
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

  const togglePostLike = async (postId: string) => {
    try {
      await likePost({
        variables: { postId: postId, userId: localStorage.getItem('id') },
      });
      await refetchPost();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleCommentLike = useCallback(
    async (commentId: string) => {
      try {
        await likeComment({
          variables: { commentId: commentId },
        });
        await refetchComments();
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    },
    [likeComment, refetchComments]
  );

  const handleAddComment = useCallback(async () => {
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
  }, [addComment, newComment, id]);

  if (postLoading || commentsLoading || countLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  if (postError || commentsError || countError)
    return (
      <div role="alert" className="alert alert-error">
        <LikeIcon />
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
              onClick={() => togglePostLike(id as string)}
            >
              <LikeIcon />
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
      <CommentsSection
        comments={comments}
        email={email}
        toggleCommentLike={toggleCommentLike}
      />

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
