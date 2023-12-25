export interface IPost {
  title: string;
  description: string;
  tags: string[];
  post: string;
  isPublic: boolean;
  time: Date;
  lastEdit: Date;
  readTime: number;
  id: string;
  author: string;
}
