import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description?: string[];
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
  lastUpdated?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface NavItem {
  id: string;
  label: string;
}