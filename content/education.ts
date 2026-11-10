import type { Localized } from "@/lib/i18n";

export type Program = {
  id: string;
  level: "bachelor" | "master" | "phd";
  title: Localized;
  meta: Localized;
  text: Localized;
  points: Localized[];
  document: string;
};

export const programs: Program[] = [
  {
    id: "bachelor",
    level: "bachelor",
    title: { ru: "Бакалавриат, профиль кафедры", en: "Bachelor’s profile" },
    meta: {
      ru: "Направление «Биология», 4 года",
      en: "Biology degree, 4 years",
    },
    text: {
      ru: "После общего биологического ядра студент выбирает профиль эмбриологии. В программе — описательный практикум, сравнительный курс и первая лабораторная задача.",
      en: "After the shared biological core, a student chooses the embryology profile. The programme includes a descriptive practical, a comparative course, and a first laboratory task.",
    },
    points: [
      { ru: "Практикум по ранним стадиям", en: "Practical on early stages" },
      { ru: "Курсовая на материале коллекции или съёмки", en: "Coursework on a collection or a recording" },
      { ru: "Летняя практика на кафедре", en: "Summer placement in the department" },
    ],
    document: "bachelor-profile",
  },
  {
    id: "master",
    level: "master",
    title: { ru: "Магистратура «Биология развития»", en: "MSc in Developmental Biology" },
    meta: { ru: "2 года", en: "2 years" },
    text: {
      ru: "Программа для тех, кто готов вести собственный вопрос внутри одного из направлений кафедры. Семинар идёт по текущим статьям, а не только по учебнику.",
      en: "A programme for students ready to carry their own question inside one departmental theme. The seminar follows current papers, not only a textbook.",
    },
    points: [
      { ru: "Исследовательская диссертация магистра", en: "A master’s research thesis" },
      { ru: "Семинар на двух языках", en: "A seminar in two languages" },
      { ru: "Доклад на кафедральной сессии", en: "A talk at the departmental session" },
    ],
    document: "master-program",
  },
  {
    id: "phd",
    level: "phd",
    title: { ru: "Аспирантура", en: "Doctoral programme" },
    meta: {
      ru: "Специальность 1.5.23 «Биология развития, эмбриология»",
      en: "Specialty 1.5.23, Developmental Biology and Embryology",
    },
    text: {
      ru: "Четыре года исследовательской работы с ежегодным семинаром. План согласуется с паспортом специальности и с задачей лаборатории.",
      en: "Four years of research with an annual seminar. The plan is agreed with the specialty passport and with the laboratory’s question.",
    },
    points: [
      { ru: "План исследования и отчётный семинар", en: "A research plan and a progress seminar" },
      { ru: "Преподавательская практика", en: "Teaching practice" },
      { ru: "Текст диссертации по правилам университета", en: "A thesis written to the university rules" },
    ],
    document: "doctoral-program",
  },
];

export type Course = {
  slug: string;
  title: Localized;
  level: "bachelor" | "master" | "phd";
  hours: number;
  semester: Localized;
  summary: Localized;
  syllabus?: string;
};

export const courses: Course[] = [
  {
    slug: "intro-embryology",
    title: { ru: "Введение в эмбриологию", en: "Introduction to Embryology" },
    level: "bachelor",
    hours: 108,
    semester: { ru: "2 курс, весна", en: "Year 2, spring" },
    summary: {
      ru: "Стадии, оси и словарь, без которого нельзя читать ни препарат, ни статью.",
      en: "Stages, axes, and the vocabulary needed to read both a specimen and a paper.",
    },
    syllabus: "syllabus-embryology",
  },
  {
    slug: "developmental-biology",
    title: { ru: "Биология развития", en: "Developmental Biology" },
    level: "bachelor",
    hours: 144,
    semester: { ru: "3 курс, осень", en: "Year 3, autumn" },
    summary: {
      ru: "Судьба клеток, индукция и основные морфогенетические движения.",
      en: "Cell fate, induction, and the principal morphogenetic movements.",
    },
    syllabus: "syllabus-development",
  },
  {
    slug: "comparative",
    title: { ru: "Сравнительная эмбриология", en: "Comparative Embryology" },
    level: "bachelor",
    hours: 72,
    semester: { ru: "3 курс, весна", en: "Year 3, spring" },
    summary: {
      ru: "Один и тот же этап у разных животных: где ряд общий, а где это только внешнее сходство.",
      en: "The same stage in different animals: where the series is shared, and where the likeness is only external.",
    },
    syllabus: "syllabus-development",
  },
  {
    slug: "methods",
    title: { ru: "Методы биологии развития", en: "Methods in Developmental Biology" },
    level: "bachelor",
    hours: 72,
    semester: { ru: "4 курс, осень", en: "Year 4, autumn" },
    summary: {
      ru: "Описание стадий, работа с коллекцией, прижизненная съёмка и аккуратная запись наблюдения.",
      en: "Staging, work with the collection, live imaging, and a careful record of an observation.",
    },
    syllabus: "syllabus-methods",
  },
  {
    slug: "molecular-development",
    title: { ru: "Молекулярные механизмы развития", en: "Molecular Mechanisms of Development" },
    level: "master",
    hours: 108,
    semester: { ru: "1 год магистратуры", en: "Master’s, year 1" },
    summary: {
      ru: "Как читать молекулярный результат рядом с морфологией, а не вместо неё.",
      en: "How to read a molecular result beside the morphology, not instead of it.",
    },
    syllabus: "syllabus-development",
  },
  {
    slug: "organogenesis",
    title: { ru: "Органогенез", en: "Organogenesis" },
    level: "master",
    hours: 72,
    semester: { ru: "1 год магистратуры", en: "Master’s, year 1" },
    summary: {
      ru: "Ранние органы: сердце, нервная трубка, зародышевые оболочки у амниот.",
      en: "Early organs: the heart, the neural tube, and the extraembryonic membranes of amniotes.",
    },
    syllabus: "syllabus-development",
  },
  {
    slug: "evo-devo",
    title: { ru: "Эволюция развития", en: "Evolution of Development" },
    level: "master",
    hours: 72,
    semester: { ru: "2 год магистратуры", en: "Master’s, year 2" },
    summary: {
      ru: "Что сравнительная эмбриология может сказать об изменении плана строения, и чего она сказать не может.",
      en: "What comparative embryology can say about a change of body plan, and what it cannot.",
    },
    syllabus: "syllabus-development",
  },
  {
    slug: "doctoral-seminar",
    title: { ru: "Семинар аспирантов", en: "Doctoral seminar" },
    level: "phd",
    hours: 72,
    semester: { ru: "ежегодно", en: "each year" },
    summary: {
      ru: "Разбор собственных данных и одной внешней статьи. Доклад готовится так, чтобы его понял соседний направление.",
      en: "A discussion of one’s own data and of one outside paper. The talk is prepared so that a neighbouring theme can follow it.",
    },
  },
];

export type Slot = {
  time: string;
  course: string;
  room: string;
  group: Localized;
};

export type Day = {
  id: string;
  title: Localized;
  slots: Slot[];
};

export const schedule: Day[] = [
  {
    id: "mon",
    title: { ru: "Понедельник", en: "Monday" },
    slots: [
      { time: "09:00–10:30", course: "intro-embryology", room: "Б-214", group: { ru: "2 курс", en: "Year 2" } },
      { time: "10:40–12:10", course: "organogenesis", room: "Б-221", group: { ru: "магистратура", en: "Master’s" } },
    ],
  },
  {
    id: "tue",
    title: { ru: "Вторник", en: "Tuesday" },
    slots: [
      { time: "09:00–12:10", course: "methods", room: "Б-118", group: { ru: "4 курс, практикум", en: "Year 4, practical" } },
      { time: "13:00–14:30", course: "doctoral-seminar", room: "Б-312", group: { ru: "аспиранты", en: "Doctoral students" } },
    ],
  },
  {
    id: "wed",
    title: { ru: "Среда", en: "Wednesday" },
    slots: [
      { time: "10:40–12:10", course: "developmental-biology", room: "Б-214", group: { ru: "3 курс", en: "Year 3" } },
      { time: "13:00–14:30", course: "molecular-development", room: "Б-314", group: { ru: "магистратура", en: "Master’s" } },
    ],
  },
  {
    id: "thu",
    title: { ru: "Четверг", en: "Thursday" },
    slots: [
      { time: "09:00–12:10", course: "comparative", room: "Б-104", group: { ru: "3 курс, коллекция", en: "Year 3, collection" } },
    ],
  },
  {
    id: "fri",
    title: { ru: "Пятница", en: "Friday" },
    slots: [
      { time: "10:40–12:10", course: "evo-devo", room: "Б-221", group: { ru: "магистратура", en: "Master’s" } },
      { time: "13:00–14:30", course: "intro-embryology", room: "Б-104", group: { ru: "2 курс, практикум", en: "Year 2, practical" } },
    ],
  },
];

export const internships = {
  lead: {
    ru: "Практика устроена как короткая исследовательская задача, а не как экскурсия. Место согласует заместитель по учебной работе.",
    en: "A placement is a short research task, not a tour. The deputy for education agrees the place.",
  } satisfies Localized,
  items: [
    {
      title: { ru: "Лабораторная практика", en: "Laboratory placement" },
      length: { ru: "4 недели, лето", en: "4 weeks, summer" },
      text: {
        ru: "Задача внутри одной из трёх лабораторий: ряд стадий, измерения или разбор уже снятого материала.",
        en: "A task inside one of the three laboratories: a stage series, measurements, or analysis of material already recorded.",
      },
    },
    {
      title: { ru: "Коллекционная практика", en: "Collection placement" },
      length: { ru: "2 недели", en: "2 weeks" },
      text: {
        ru: "Разбор, этикетаж и описание препаратов ранних стадий для учебного фонда.",
        en: "Sorting, labelling, and description of early-stage specimens for the teaching collection.",
      },
    },
    {
      title: { ru: "Выездной сравнительный практикум", en: "Comparative field practical" },
      length: { ru: "10 дней", en: "10 days" },
      text: {
        ru: "Совместно с кафедрой зоологии: фиксация стадий и ведение полевого журнала. Набор объявляется весной.",
        en: "With the zoology department: fixation of stages and a field notebook. The call opens in spring.",
      },
    },
  ] satisfies { title: Localized; length: Localized; text: Localized }[],
  steps: [
    {
      ru: "Короткое письмо заместителю по учебной работе: курс, срок и какая практика интересна.",
      en: "A short note to the deputy for education: year, dates, and which placement you want.",
    },
    {
      ru: "Встреча с руководителем практики и письменная формулировка задачи на полстраницы.",
      en: "A meeting with the placement supervisor and a half-page written statement of the task.",
    },
    {
      ru: "Журнал наблюдений и короткий отчёт. Отчёт можно сдать на русском или английском.",
      en: "An observation notebook and a short report. The report may be submitted in Russian or English.",
    },
  ] satisfies Localized[],
};
