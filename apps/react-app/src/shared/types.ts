export type Author = {
  email: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: Author;
  hasLiked?: boolean;
  numberOfLikes?: number;
};

export type Comment = {
  id: string;
  content: string;
  author: Author;
  hasLiked?: boolean;
  numberOfLikes?: number;
  createdAt: string;
}
