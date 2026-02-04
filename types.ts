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

export interface ParitaItem {
  id: number;
  title: string;
  content: string; // Teks Pali / Mantra / Instruksi Awal
  translation: string; // Terjemahan / Penjelasan
  note?: string; // Instruksi tambahan (opsional)
}

export type ViewState = 'home' | 'syair' | 'parita' | 'kontak';