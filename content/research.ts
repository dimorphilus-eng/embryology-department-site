import type { Localized } from "@/lib/i18n";

export type Direction = {
  id: string;
  index: string;
  title: Localized;
  text: Localized;
  models: Localized;
};

export const directions: Direction[] = [
  {
    id: "axial",
    index: "01",
    title: { ru: "Осевой паттернинг", en: "Axial patterning" },
    text: {
      ru: "Как сигнальные центры задают передне-заднюю и спинно-брюшную оси и как эти сигналы читаются в движениях гаструлы.",
      en: "How signaling centers set the anterior–posterior and dorsal–ventral axes, and how those signals are read in the movements of the gastrula.",
    },
    models: { ru: "Шпорцевая лягушка, куриный зародыш", en: "Xenopus, chick embryo" },
  },
  {
    id: "germline",
    index: "02",
    title: { ru: "Зародышевая линия", en: "Germline" },
    text: {
      ru: "Обособление первичных половых клеток, их миграция и то, что удерживает их от судьбы соматических тканей.",
      en: "Segregation of primordial germ cells, their migration, and what keeps them from a somatic fate.",
    },
    models: { ru: "Амфибии, модельные рыбы", en: "Amphibians, model fishes" },
  },
  {
    id: "organs",
    index: "03",
    title: { ru: "Органогенез", en: "Organogenesis" },
    text: {
      ru: "Сборка ранних органов, прежде всего сердечного поля: складки, слияние зачатков и лево-правая асимметрия.",
      en: "Assembly of early organs, above all the heart field: folds, fusion of primordia, and left–right asymmetry.",
    },
    models: { ru: "Куриный и перепелиный зародыш", en: "Chick and quail embryos" },
  },
  {
    id: "neural",
    index: "04",
    title: { ru: "Нейруляция", en: "Neurulation" },
    text: {
      ru: "Механика закрытия нервной трубки и то, как форма эпителия связана с картой зачатков нервной системы.",
      en: "The mechanics of neural tube closure, and how epithelial shape relates to the fate map of the nervous system.",
    },
    models: { ru: "Амниоты", en: "Amniotes" },
  },
  {
    id: "regeneration",
    index: "05",
    title: { ru: "Регенерация", en: "Regeneration" },
    text: {
      ru: "Где эмбриональная хвостовая почка и восстановление после потери хвоста пользуются общим набором клеток, а где расходятся.",
      en: "Where the embryonic tail bud and restoration after tail loss share a cell set, and where they diverge.",
    },
    models: { ru: "Хвостатые амфибии", en: "Urodele amphibians" },
  },
  {
    id: "comparative",
    index: "06",
    title: { ru: "Сравнительная эмбриология", en: "Comparative embryology" },
    text: {
      ru: "Геометрия дробления, появление полости и устойчивость сроков развития при сдвиге температуры у рыб и амфибий.",
      en: "Cleavage geometry, the appearance of a cavity, and the robustness of developmental timing under a temperature shift in fishes and amphibians.",
    },
    models: { ru: "Осетровые, амфибии", en: "Sturgeons, amphibians" },
  },
];

export type Project = {
  slug: string;
  title: Localized;
  years: string;
  status: "active" | "completed";
  pi: string;
  code: string;
  summary: Localized;
  direction: string;
};

export const projects: Project[] = [
  {
    slug: "axial-maps",
    title: {
      ru: "Карты организатора при гаструляции",
      en: "Maps of the organizer during gastrulation",
    },
    years: "2024–2027",
    status: "active",
    pi: "elena-sokolova",
    code: "AU-DB-24-118",
    summary: {
      ru: "Количественное описание того, где и когда читается сигнал организатора на ранней гаструле. Номер гранта учебный и перед публикацией сайта заменяется настоящим.",
      en: "A quantitative account of where and when the organizer signal is read in the early gastrula. The grant number is a sample and should be replaced before the site is published.",
    },
    direction: "axial",
  },
  {
    slug: "germ-cell-path",
    title: {
      ru: "Путь первичных половых клеток",
      en: "The path of primordial germ cells",
    },
    years: "2023–2026",
    status: "active",
    pi: "andrey-levin",
    code: "AU-DB-23-074",
    summary: {
      ru: "Съёмка миграции и разбор того, какие ориентиры клетки зародышевой линии используют на среднем участке пути.",
      en: "Imaging of migration and an account of the cues germline cells use on the middle part of the route.",
    },
    direction: "germline",
  },
  {
    slug: "heart-field",
    title: {
      ru: "Сложение сердечного поля",
      en: "Folding of the heart field",
    },
    years: "2025–2028",
    status: "active",
    pi: "maria-zhang",
    code: "AU-DB-25-033",
    summary: {
      ru: "Как парные зачатки сердца встречаются в средней линии и в какой момент фиксируется направление петли.",
      en: "How the paired heart primordia meet at the midline and when the direction of the loop is fixed.",
    },
    direction: "organs",
  },
  {
    slug: "tail-bud",
    title: {
      ru: "Хвостовая почка и восстановление",
      en: "Tail bud and restoration",
    },
    years: "2026–2028",
    status: "active",
    pi: "anna-volkova",
    code: "AU-DB-26-011",
    summary: {
      ru: "Сравнение клеточных наборов хвостовой почки и раннего регенерата у двух видов хвостатых амфибий.",
      en: "A comparison of cell sets in the tail bud and the early regenerate of two urodele species.",
    },
    direction: "regeneration",
  },
  {
    slug: "cleavage-geometry",
    title: {
      ru: "Геометрия дробления и бластоцель",
      en: "Cleavage geometry and the blastocoel",
    },
    years: "2022–2025",
    status: "completed",
    pi: "dmitry-kim",
    code: "AU-DB-22-090",
    summary: {
      ru: "Завершённый сравнительный ряд: как плоскость делений связана с появлением полости у осетровых и амфибий. Материалы ряда переданы в учебную коллекцию.",
      en: "A completed comparative series on how the plane of division relates to the cavity in sturgeons and amphibians. The series has gone into the teaching collection.",
    },
    direction: "comparative",
  },
];

export type Lab = {
  slug: string;
  title: Localized;
  lead: string;
  text: Localized;
  focus: Localized[];
};

export const labs: Lab[] = [
  {
    slug: "early",
    title: { ru: "Лаборатория раннего развития", en: "Laboratory of Early Development" },
    lead: "elena-sokolova",
    text: {
      ru: "Гаструляция, организатор и зародышевая линия. Здесь же стоит установка для прижизненной съёмки, которой пользуется вся кафедра.",
      en: "Gastrulation, the organizer, and the germline. The live-imaging setup used by the whole department is here.",
    },
    focus: [
      { ru: "Карты клеточных потоков", en: "Cell-flow maps" },
      { ru: "Сигнальные центры", en: "Signaling centers" },
      { ru: "Миграция половых клеток", en: "Germ-cell migration" },
    ],
  },
  {
    slug: "organs",
    title: { ru: "Лаборатория органогенеза", en: "Laboratory of Organogenesis" },
    lead: "maria-zhang",
    text: {
      ru: "Ранние органы амниот: сердце и нервная трубка. Лаборатория держит учебную коллекцию стадий, по которой идёт практикум.",
      en: "Early amniote organs: the heart and the neural tube. The laboratory keeps the stage collection used in the practical course.",
    },
    focus: [
      { ru: "Сердечное поле", en: "Heart field" },
      { ru: "Закрытие нервной трубки", en: "Neural tube closure" },
      { ru: "Учебные серии стадий", en: "Teaching stage series" },
    ],
  },
  {
    slug: "comparative",
    title: { ru: "Лаборатория сравнительной эмбриологии", en: "Laboratory of Comparative Embryology" },
    lead: "dmitry-kim",
    text: {
      ru: "Ранние стадии рыб и амфибий, геометрия дробления и то, как срок развития отвечает на температуру. Коллекция открыта для практикума.",
      en: "Early stages of fishes and amphibians, cleavage geometry, and how developmental timing answers temperature. The collection is open for the practical course.",
    },
    focus: [
      { ru: "Ряды дробления", en: "Cleavage series" },
      { ru: "Сравнительные таблицы стадий", en: "Comparative stage tables" },
      { ru: "Температурные окна", en: "Temperature windows" },
    ],
  },
];

export type Publication = {
  id: string;
  title: Localized;
  authors: Localized;
  authorSlugs: string[];
  year: number;
  venue: Localized;
  doi: string;
};

export const publications: Publication[] = [
  {
    id: "2026-flows",
    title: {
      ru: "Клеточные потоки ранней гаструлы: сопоставимые карты по трём кладкам",
      en: "Cell flows of the early gastrula: comparable maps from three clutches",
    },
    authors: { ru: "Орлов И.М., Соколова Е.В.", en: "Orlov I.M., Sokolova E.V." },
    authorSlugs: ["ilya-orlov", "elena-sokolova"],
    year: 2026,
    venue: { ru: "Development (образец)", en: "Development (sample)" },
    doi: "10.0000/demo.emb.2026.01",
  },
  {
    id: "2026-heart",
    title: {
      ru: "Встреча сердечных зачатков в средней линии у куриного зародыша",
      en: "Meeting of the heart primordia at the midline in the chick",
    },
    authors: { ru: "Чжан М.И., Никитин С.О.", en: "Zhang M.I., Nikitin S.O." },
    authorSlugs: ["maria-zhang", "sergey-nikitin"],
    year: 2026,
    venue: { ru: "Developmental Biology (образец)", en: "Developmental Biology (sample)" },
    doi: "10.0000/demo.emb.2026.02",
  },
  {
    id: "2025-germ",
    title: {
      ru: "Средний участок пути первичных половых клеток",
      en: "The middle segment of the primordial germ-cell route",
    },
    authors: { ru: "Левин А.П., Орлов И.М.", en: "Levin A.P., Orlov I.M." },
    authorSlugs: ["andrey-levin", "ilya-orlov"],
    year: 2025,
    venue: { ru: "Онтогенез (образец)", en: "Russian Journal of Developmental Biology (sample)" },
    doi: "10.0000/demo.emb.2025.03",
  },
  {
    id: "2025-tube",
    title: {
      ru: "Натяжение эпителия и закрытие нервной трубки",
      en: "Epithelial tension and neural tube closure",
    },
    authors: { ru: "Никитин С.О., Чжан М.И.", en: "Nikitin S.O., Zhang M.I." },
    authorSlugs: ["sergey-nikitin", "maria-zhang"],
    year: 2025,
    venue: { ru: "Journal of Experimental Zoology B (образец)", en: "Journal of Experimental Zoology B (sample)" },
    doi: "10.0000/demo.emb.2025.04",
  },
  {
    id: "2025-tail",
    title: {
      ru: "Хвостовая почка и ранний регенерат: общий и различный набор клеток",
      en: "Tail bud and early regenerate: shared and distinct cell sets",
    },
    authors: { ru: "Волкова А.С., Ким Д.А.", en: "Volkova A.S., Kim D.A." },
    authorSlugs: ["anna-volkova", "dmitry-kim"],
    year: 2025,
    venue: { ru: "Cells & Development (образец)", en: "Cells & Development (sample)" },
    doi: "10.0000/demo.emb.2025.05",
  },
  {
    id: "2024-cleavage",
    title: {
      ru: "Плоскости дробления и появление бластоцеля у осетровых",
      en: "Cleavage planes and the appearance of the blastocoel in sturgeons",
    },
    authors: { ru: "Ким Д.А., Белова О.Н.", en: "Kim D.A., Belova O.N." },
    authorSlugs: ["dmitry-kim", "olga-belova"],
    year: 2024,
    venue: { ru: "Journal of Morphology (образец)", en: "Journal of Morphology (sample)" },
    doi: "10.0000/demo.emb.2024.06",
  },
  {
    id: "2024-temp",
    title: {
      ru: "Температурное окно, в котором срок гаструляции остаётся устойчивым",
      en: "A temperature window in which gastrulation timing stays robust",
    },
    authors: { ru: "Белова О.Н., Ким Д.А.", en: "Belova O.N., Kim D.A." },
    authorSlugs: ["olga-belova", "dmitry-kim"],
    year: 2024,
    venue: { ru: "Онтогенез (образец)", en: "Russian Journal of Developmental Biology (sample)" },
    doi: "10.0000/demo.emb.2024.07",
  },
  {
    id: "2024-review",
    title: {
      ru: "Осевой паттернинг: заметки к семинару кафедры",
      en: "Axial patterning: notes for the departmental seminar",
    },
    authors: { ru: "Соколова Е.В., Левин А.П.", en: "Sokolova E.V., Levin A.P." },
    authorSlugs: ["elena-sokolova", "andrey-levin"],
    year: 2024,
    venue: { ru: "Семинар кафедры (образец)", en: "Departmental seminar (sample)" },
    doi: "10.0000/demo.emb.2024.08",
  },
  {
    id: "2023-atlas",
    title: {
      ru: "Учебный атлас стадий нейруляции для практикума",
      en: "A teaching atlas of neurulation stages for the practical course",
    },
    authors: { ru: "Никитин С.О., Белова О.Н.", en: "Nikitin S.O., Belova O.N." },
    authorSlugs: ["sergey-nikitin", "olga-belova"],
    year: 2023,
    venue: { ru: "Методическое издание кафедры (образец)", en: "Departmental teaching paper (sample)" },
    doi: "10.0000/demo.emb.2023.09",
  },
  {
    id: "2023-loop",
    title: {
      ru: "Когда фиксируется направление сердечной петли",
      en: "When the direction of the cardiac loop is fixed",
    },
    authors: { ru: "Чжан М.И.", en: "Zhang M.I." },
    authorSlugs: ["maria-zhang"],
    year: 2023,
    venue: { ru: "Developmental Dynamics (образец)", en: "Developmental Dynamics (sample)" },
    doi: "10.0000/demo.emb.2023.10",
  },
  {
    id: "2022-germ",
    title: {
      ru: "Ранние маркеры зародышевой линии до начала миграции",
      en: "Early germline markers before migration begins",
    },
    authors: { ru: "Левин А.П.", en: "Levin A.P." },
    authorSlugs: ["andrey-levin"],
    year: 2022,
    venue: { ru: "Development (образец)", en: "Development (sample)" },
    doi: "10.0000/demo.emb.2022.11",
  },
  {
    id: "2021-compare",
    title: {
      ru: "Сравнительная таблица ранних стадий для курса эмбриологии",
      en: "A comparative table of early stages for the embryology course",
    },
    authors: { ru: "Ким Д.А., Соколова Е.В.", en: "Kim D.A., Sokolova E.V." },
    authorSlugs: ["dmitry-kim", "elena-sokolova"],
    year: 2021,
    venue: { ru: "Методическое издание кафедры (образец)", en: "Departmental teaching paper (sample)" },
    doi: "10.0000/demo.emb.2021.12",
  },
];

export type Dissertation = {
  slug: string;
  title: Localized;
  author: Localized;
  year: number;
  supervisor: string;
  degree: Localized;
};

export const dissertations: Dissertation[] = [
  {
    slug: "volkova-2023",
    title: {
      ru: "Клеточный состав хвостовой почки и раннего регенерата у хвостатых амфибий",
      en: "Cell composition of the tail bud and the early regenerate in urodeles",
    },
    author: { ru: "А.С. Волкова", en: "A.S. Volkova" },
    year: 2023,
    supervisor: "elena-sokolova",
    degree: { ru: "кандидат биологических наук", en: "Candidate of Sciences in Biology" },
  },
  {
    slug: "belova-2021",
    title: {
      ru: "Устойчивость сроков гаструляции при сдвиге температуры",
      en: "Robustness of gastrulation timing under a temperature shift",
    },
    author: { ru: "О.Н. Белова", en: "O.N. Belova" },
    year: 2021,
    supervisor: "dmitry-kim",
    degree: { ru: "кандидат биологических наук", en: "Candidate of Sciences in Biology" },
  },
  {
    slug: "zhang-2019",
    title: {
      ru: "Морфогенез раннего сердечного поля у куриного зародыша",
      en: "Morphogenesis of the early heart field in the chick",
    },
    author: { ru: "М.И. Чжан", en: "M.I. Zhang" },
    year: 2019,
    supervisor: "elena-sokolova",
    degree: { ru: "кандидат биологических наук", en: "Candidate of Sciences in Biology" },
  },
  {
    slug: "nikitin-2016",
    title: {
      ru: "Механика закрытия нервной трубки на учебных и экспериментальных сериях",
      en: "Mechanics of neural tube closure in teaching and experimental series",
    },
    author: { ru: "С.О. Никитин", en: "S.O. Nikitin" },
    year: 2016,
    supervisor: "andrey-levin",
    degree: { ru: "кандидат биологических наук", en: "Candidate of Sciences in Biology" },
  },
];
