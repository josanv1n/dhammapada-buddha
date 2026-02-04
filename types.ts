export interface Verse {
  id: string;
  chapterIndex: number;
  verseNumber: number;
  pali: string;
  indonesian: string;
}

export interface Chapter {
  id: string;
  index: number;
  title: string;
  paliTitle: string;
  verses: Verse[];
}

export type ViewState = 'home' | 'syair' | 'kontak';