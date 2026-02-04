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

export interface SongItem {
  id: number;
  title: string;
  lyrics: string;
}

export type ViewState = 'home' | 'syair' | 'parita' | 'lagu' | 'kontak';

export type ThemeMode = 
  | 'default'   // Techno Dark (Awal)
  | 'light'     // Terang (Putih)
  | 'gray'      // Abu-abu Terang
  | 'green'     // Hijau Terang
  | 'blue'      // Biru Terang
  | 'pink'      // Merah Jambu
  | 'black'     // Hitam
  | 'yellow';   // Kuning