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
