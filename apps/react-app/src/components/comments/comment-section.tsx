import React from 'react';
import { Comment } from '../../shared/types';
import { LikeIcon } from '../Icons/like-icon';

interface CommentsSectionProps {
  comments: Comment[];
  email: string | null;
  toggleCommentLike: (commentId: string) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = React.memo(
  ({ comments, email, toggleCommentLike }) => {
    return (
      <div className="card bg-base-100 w-100">
        <div className="card-body">
          <h3 className="text-lg font-medium mb-2">
            Comments ({comments.length})
          </h3>
          {comments.map(comment => (
            <div key={comment.id} className="border p-4 mt-4">
              <p>{comment.content}</p>
              <p className="text-sm font-light mt-2">{comment.author.email}</p>
              <p className="text-xs font-light mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <button
                disabled={!email}
                className={
                  comment.hasLiked
                    ? 'btn btn-success mt-4'
                    : 'btn btn-outline btn-accent mt-4'
                }
                onClick={() => toggleCommentLike(comment.id)}
              >
                <LikeIcon />
                <span>{comment.numberOfLikes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
