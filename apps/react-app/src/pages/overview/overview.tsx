import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS, TOGGLE_POST_LIKE } from '../../shared/queries';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import EditModal from '../../components/modals/edit-modal';
import { Post } from '../../shared/types';

type PostQuery = {
  posts: Post[];
};

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
      await likePost({ variables: { postId: postId, userId: localStorage.getItem('id') } });
      await refetch();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <>

        <h1 className="text-xl font-medium mb-4">Overview</h1>
      {
        email && (
          <button className="btn btn-primary mb-4 md:justify-end" onClick={openModal}>
            Create New Post
          </button>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data?.posts?.map(post => (
          <div className="card bg-base-100 w-full shadow-xl" key={post.id}>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">{post.title}</h2>
                <div className="flex items-center mt-4">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                  </svg>
                  <span>{post.numberOfLikes}</span>
                </div>
              </div>
              <p>{post.content}</p>
              <div className="card-actions justify-end mt-4">
                <button disabled={!email} className={post.hasLiked ? 'btn btn-success' : 'btn btn-outline btn-accent'}
                        onClick={() => toggleLike(post.id)}>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                  </svg>
                </button>
                <button className="btn btn-primary" onClick={() => navigateToPost(post.id)}>Go to post</button>
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
