export interface Post {
  title: string;
  permalink: string;
  category: {
    idID: string;
    category: string;
  };
  image: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}
