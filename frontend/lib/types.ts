export type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export type GalleryImage = {
  id: number;
  title: string;
  image_url: string;
};

export type HomeContent = {
  hero: Record<string, string>;
  about: Record<string, string>;
  contact: Record<string, string>;
  courses: Course[];
  gallery: GalleryImage[];
};
