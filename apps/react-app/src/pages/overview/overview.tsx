import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS, TOGGLE_POST_LIKE } from '../../shared/queries';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import EditModal from '../../components/modals/edit-modal';
import { Post } from '../../shared/types';
import { LikeIcon } from '../../components/Icons/like-icon';

type PostQuery = {
  posts: Post[];
};

/*
 Possible improvements
 - Add pagination (same for comments)
 - Memo icons to prevent rerendering
 */

export function Overview() {
  const navigate = useNavigate();
  const { data, refetch } = useQuery<PostQuery>(GET_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email] = useState(localStorage.getItem('email'));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [likePost] = useMutation(TOGGLE_POST_LIKE);

  const navigateToPost = (id: string) => {
    navigate(`/post/${id}`);
  };

  const toggleLike = async (postId: string) => {
    try {
      await likePost({
        variables: { postId: postId, userId: localStorage.getItem('id') },
      });
      await refetch();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <>
      <h1 className="text-xl font-medium mb-4">Overview</h1>
      {email && (
        <button
          className="btn btn-primary mb-4 md:justify-end"
          onClick={openModal}
        >
          Create New Post
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data?.posts?.map(post => (
          <div className="card bg-base-100 w-full shadow-xl" key={post.id}>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">{post.title}</h2>
                <div className="flex items-center mt-4">
                  <LikeIcon />
                  <span>{post.numberOfLikes}</span>
                </div>
              </div>
              <p>{post.content}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  disabled={!email}
                  className={
                    post.hasLiked
                      ? 'btn btn-success'
                      : 'btn btn-outline btn-accent'
                  }
                  onClick={() => toggleLike(post.id)}
                >
                  <LikeIcon />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToPost(post.id)}
                >
                  Go to post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditModal isOpen={isModalOpen} onClose={closeModal} refetch={refetch} />
    </>
  );
}

export default Overview;
