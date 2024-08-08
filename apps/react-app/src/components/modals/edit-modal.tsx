import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_POST } from '../../shared/queries';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export function EditModal({ isOpen, onClose, refetch }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost] = useMutation(CREATE_POST);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          title,
          content,
          authorId: localStorage.getItem('id'),
        },
      });
      navigate('/overview');
      refetch();
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-xl font-medium mb-4">Create a new article</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
