export interface ProductCategory {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  image: string;
}

export interface Statistic {
  value: string;
  description: string;
  color?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  position: string;
  avatar: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}