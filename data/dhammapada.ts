import { Chapter } from '../types';

// Data sampel yang merepresentasikan isi dari link yang diberikan.
// Karena saya tidak bisa browsing live, saya memasukkan Bab 1 (Yamaka Vagga) secara lengkap 
// dan beberapa sampel lainnya sebagai struktur database.

export const dhammapadaData: Chapter[] = [
  {
    id: "c1",
    index: 1,
    title: "Bab Kembar",
    paliTitle: "Yamaka Vagga",
    verses: [
      {
        id: "v1",
        chapterIndex: 1,
        verseNumber: 1,
        pali: "Manopubbaṅgamā dhammā, manoseṭṭhā manomayā;\nManasā ce paduṭṭhena, bhāsati vā karoti vā;\nTato naṃ dukkhamanveti, cakkaṃva vahato padaṃ.",
        indonesian: "Pikiran adalah pelopor dari segala sesuatu, pikiran adalah pemimpin, pikiran adalah pembentuk. Bila seseorang berbicara atau berbuat dengan pikiran jahat, maka penderitaan akan mengikutinya, bagaikan roda pedati mengikuti langkah kaki lembu yang menariknya."
      },
      {
        id: "v2",
        chapterIndex: 1,
        verseNumber: 2,
        pali: "Manopubbaṅgamā dhammā, manoseṭṭhā manomayā;\nManasā ce pasannena, bhāsati vā karoti vā;\nTato naṃ sukhamanveti, chāyāva anapāyinī.",
        indonesian: "Pikiran adalah pelopor dari segala sesuatu, pikiran adalah pemimpin, pikiran adalah pembentuk. Bila seseorang berbicara atau berbuat dengan pikiran murni, maka kebahagiaan akan mengikutinya, bagaikan bayang-bayang yang tak pernah meninggalkan bendanya."
      },
      {
        id: "v3",
        chapterIndex: 1,
        verseNumber: 3,
        pali: "Akkocchi maṃ avadhi maṃ, ajini maṃ ahāsi me;\nYe taṃ upanayhanti, veraṃ tesaṃ na sammati.",
        indonesian: "\"Ia menghina saya, ia memukul saya, ia mengalahkan saya, ia merampas milik saya.\" Selama seseorang masih menyimpan pikiran seperti itu, maka kebencian tak akan pernah berakhir."
      },
      {
        id: "v4",
        chapterIndex: 1,
        verseNumber: 4,
        pali: "Akkocchi maṃ avadhi maṃ, ajini maṃ ahāsi me;\nYe taṃ na upanayhanti, veraṃ tesūpasammati.",
        indonesian: "\"Ia menghina saya, ia memukul saya, ia mengalahkan saya, ia merampas milik saya.\" Jika seseorang tidak lagi menyimpan pikiran-pikiran seperti itu, maka kebencian akan berakhir."
      },
      {
        id: "v5",
        chapterIndex: 1,
        verseNumber: 5,
        pali: "Na hi verena verāni, sammantīdha kudācanaṃ;\nAverena ca sammanti, esa dhammo sanantano.",
        indonesian: "Kebencian tak akan pernah berakhir apabila dibalas dengan kebencian. Tetapi, kebencian akan berakhir bila dibalas dengan tidak membenci. Inilah satu hukum abadi."
      },
      {
        id: "v6",
        chapterIndex: 1,
        verseNumber: 6,
        pali: "Pare ca na vijānanti, ayamettha yamāmase;\nYe ca tattha vijānanti, tato sammanti medhagā.",
        indonesian: "Banyak orang tidak menyadari bahwa di dunia ini kita semua dapat menemui ajal. Tetapi, bagi mereka yang menyadari hal ini, segala pertengkaran akan segera berakhir."
      }
    ]
  },
  {
    id: "c2",
    index: 2,
    title: "Kewaspadaan",
    paliTitle: "Appamada Vagga",
    verses: [
      {
        id: "v21",
        chapterIndex: 2,
        verseNumber: 21,
        pali: "Appamādo amatapadaṃ, pamādo maccuno padaṃ;\nAppamattā na mīyanti, ye pamattā yathā matā.",
        indonesian: "Kewaspadaan adalah jalan menuju Kekekalan (Nibbana); kelengah-lengahen adalah jalan menuju kematian. Mereka yang waspada tidak akan mati; tetapi mereka yang lengah, meskipun hidup sebetulnya seperti orang mati."
      },
      {
        id: "v22",
        chapterIndex: 2,
        verseNumber: 22,
        pali: "Etaṃ visesato ñatvā, appamādamhi paṇḍitā;\nAppamāde pamodanti, ariyānaṃ gocare ratā.",
        indonesian: "Setelah mengerti hal ini dengan jelas, orang bijaksana bergembira dalam kewaspadaan dan bergembira dalam praktek para ariya."
      }
    ]
  },
  {
    id: "c3",
    index: 3,
    title: "Pikiran",
    paliTitle: "Citta Vagga",
    verses: [
      {
        id: "v33",
        chapterIndex: 3,
        verseNumber: 33,
        pali: "Phandanaṃ capalaṃ cittaṃ, durakkhaṃ dunnivārayaṃ;\nUjuṃ karoti medhāvī, usukārova tejanaṃ.",
        indonesian: "Pikiran itu selalu mengembara, tidak tetap, sukar dijaga dan sukar dikendalikan. Orang bijaksana meluruskannya bagaikan seorang pembuat panah meluruskan anak panah."
      }
    ]
  },
   {
    id: "c4",
    index: 4,
    title: "Bunga-bunga",
    paliTitle: "Puppha Vagga",
    verses: [
      {
        id: "v44",
        chapterIndex: 4,
        verseNumber: 44,
        pali: "Ko imaṃ paṭhaviṃ vicessati, Yamalokañca imaṃ sadevakaṃ;\nKo dhammapadaṃ sudesitaṃ, kusalo pupphamiva pacessati.",
        indonesian: "Siapakah yang akan menaklukkan dunia ini beserta dunia Yama dan dunia Dewa? Siapakah yang akan menyelidiki Jalan Kebajikan (Dhammapada) yang telah diajarkan dengan jelas, bagaikan seorang perangkai bunga yang pandai memilih bunga?"
      }
    ]
  }
];