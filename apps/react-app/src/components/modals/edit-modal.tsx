import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_POST } from '../../shared/queries';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export function EditModal({ isOpen, onClose, refetch }: EditModalProps) {
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  });

  const [createPost] = useMutation(CREATE_POST);
  const navigate = useNavigate();
  const authorId = localStorage.getItem('id');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          ...formState,
          authorId,
        },
      });
      navigate('/overview');
      refetch();
      onClose();
    } catch (error) {
      console.error('Error creating post:', (error as Error).message);
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
            name="title"
            required
            placeholder="Title"
            className="input input-bordered w-full"
            value={formState.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            value={formState.content}
            onChange={handleChange}
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
