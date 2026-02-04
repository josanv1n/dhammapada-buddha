export interface Verse {
  number: number;
  pali: string;
  translation: string;
}

export interface Vagga {
  id: number;
  title: string;
  translation: string;
  verses: Verse[];
}

export type ViewState = 'home' | 'syair' | 'kontak';