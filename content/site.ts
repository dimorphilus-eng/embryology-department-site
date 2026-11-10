import type { Localized } from "@/lib/i18n";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://embryology.example.edu",
  email: "embryology@example.edu",
  admissionsEmail: "admissions.embryology@example.edu",
  phone: "+7 (495) 000-11-20",
  phoneHref: "tel:+74950001120",
  telegram: "https://t.me/embryology_dept",
  telegramLabel: "@embryology_dept",
  founded: 1964,
  map: {
    lat: 55.7517,
    lng: 37.6184,
    bbox: "37.598,55.742,37.639,55.761",
  },
  name: {
    ru: "Кафедра эмбриологии и биологии развития",
    en: "Department of Embryology and Developmental Biology",
  } satisfies Localized,
  shortName: {
    ru: "Кафедра эмбриологии",
    en: "Department of Embryology",
  } satisfies Localized,
  university: {
    ru: "Академический университет",
    en: "Academic University",
  } satisfies Localized,
  institute: {
    ru: "Институт фундаментальной биологии",
    en: "Institute of Fundamental Biology",
  } satisfies Localized,
  address: {
    ru: "125009, Москва, Академический проезд, 18, корпус «Био»",
    en: "18 Academic Drive, Building B, Moscow, 125009, Russia",
  } satisfies Localized,
  hours: {
    ru: "Пн–пт, 09:30–17:30",
    en: "Mon–Fri, 09:30–17:30",
  } satisfies Localized,
};

export const hero = {
  eyebrow: site.institute,
  title: {
    ru: "Как из одной клетки возникает форма",
    en: "How a single cell acquires form",
  } satisfies Localized,
  lead: {
    ru: "Кафедра эмбриологии и биологии развития изучает, как наследственная программа и окружение клетки складываются в ткани, органы и план строения. Мы соединяем классическое описание зародыша, количественную визуализацию и сравнительный подход.",
    en: "The Department of Embryology and Developmental Biology studies how an inherited program and a cell’s surroundings become tissues, organs, and a body plan. We join classical description of the embryo with quantitative imaging and comparative work.",
  } satisfies Localized,
};

export const stages: { id: string; title: Localized; text: Localized }[] = [
  {
    id: "zygote",
    title: { ru: "Зигота", en: "Zygote" },
    text: { ru: "Одна клетка и первая асимметрия.", en: "One cell, and the first asymmetry." },
  },
  {
    id: "cleavage",
    title: { ru: "Дробление", en: "Cleavage" },
    text: { ru: "Деления без роста и раскладка бластомеров.", en: "Divisions without growth, and the layout of blastomeres." },
  },
  {
    id: "blastula",
    title: { ru: "Бластула", en: "Blastula" },
    text: { ru: "Полость, судьбы клеток, карта зачатков.", en: "A cavity, cell fates, and a fate map." },
  },
  {
    id: "gastrula",
    title: { ru: "Гаструла", en: "Gastrula" },
    text: { ru: "Движения пластов и оси тела.", en: "Tissue movements and the body axes." },
  },
  {
    id: "organs",
    title: { ru: "Органы", en: "Organs" },
    text: { ru: "Форма, которая уже узнаваема.", en: "A form that is already recognizable." },
  },
];

export const history: { year: string; text: Localized }[] = [
  {
    year: "1964",
    text: {
      ru: "Кафедра выделена из кафедры зоологии, чтобы отдельно вести сравнительную и экспериментальную эмбриологию.",
      en: "The department was separated from zoology so that comparative and experimental embryology could be taught on their own.",
    },
  },
  {
    year: "1978",
    text: {
      ru: "Открыта лаборатория раннего развития. В учебный план вошли экспериментальные задачи на модельных зародышах.",
      en: "The Laboratory of Early Development opened. Experimental work on model embryos entered the curriculum.",
    },
  },
  {
    year: "1996",
    text: {
      ru: "Запущена магистерская специализация по биологии развития.",
      en: "A master’s track in developmental biology was introduced.",
    },
  },
  {
    year: "2008",
    text: {
      ru: "Появилась группа количественной визуализации: прижизненная съёмка и разбор морфогенетических движений.",
      en: "A quantitative imaging group was formed for live recording and analysis of morphogenetic movements.",
    },
  },
  {
    year: "2019",
    text: {
      ru: "Начато сотрудничество с исследовательскими группами, которые изучают нарушения развития. Кафедра не ведёт клинический приём.",
      en: "Collaboration began with research groups studying developmental disorders. The department does not provide clinical care.",
    },
  },
  {
    year: "2024",
    text: {
      ru: "Открыта лаборатория сравнительной эмбриологии и обновлён практикум по коллекциям ранних стадий.",
      en: "The Laboratory of Comparative Embryology opened, and the practical course on early-stage collections was renewed.",
    },
  },
];

export const mission = {
  text: {
    ru: "Понимать, как строится организм, и передавать это знание так, чтобы им могли пользоваться студенты, коллеги и те, кто поддерживает исследования.",
    en: "To understand how an organism is built, and to teach that knowledge so students, colleagues, and research sponsors can use it.",
  } satisfies Localized,
  goals: [
    {
      ru: "Исследовать механизмы раннего развития, органогенеза и регенерации на сравнимом наборе моделей.",
      en: "Study the mechanisms of early development, organogenesis, and regeneration across a comparable set of models.",
    },
    {
      ru: "Готовить биологов, которые умеют читать зародыш и современную статью с одинаковой внимательностью.",
      en: "Train biologists who can read an embryo and a current paper with the same care.",
    },
    {
      ru: "Держать открытыми коллекции, протоколы описания и данные, которыми кафедра готова делиться.",
      en: "Keep collections, descriptive protocols, and data open where the department is free to share them.",
    },
  ] satisfies Localized[],
};

export const orgUnits: { title: Localized; text: Localized }[] = [
  {
    title: { ru: "Заведующий кафедрой", en: "Head of department" },
    text: {
      ru: "Научная программа, представительство кафедры и итоговая ответственность за учебный план.",
      en: "The research programme, external representation, and final responsibility for the curriculum.",
    },
  },
  {
    title: { ru: "Заместитель по науке", en: "Deputy for research" },
    text: {
      ru: "Проекты, отчёты по грантам, семинар кафедры и аспирантура.",
      en: "Projects, grant reporting, the departmental seminar, and doctoral training.",
    },
  },
  {
    title: { ru: "Заместитель по учебной работе", en: "Deputy for education" },
    text: {
      ru: "Расписание, практики, методические материалы и связь с учебным офисом института.",
      en: "Timetable, placements, teaching materials, and the link to the institute teaching office.",
    },
  },
  {
    title: { ru: "Лаборатории", en: "Laboratories" },
    text: {
      ru: "Три исследовательские группы со своими моделями, оборудованием и студенческими местами.",
      en: "Three research groups, each with its own models, equipment, and places for students.",
    },
  },
  {
    title: { ru: "Учебный офис", en: "Teaching office" },
    text: {
      ru: "Справки, запись на курсы по выбору, практикумы и архив учебных программ.",
      en: "Letters, elective enrolment, practicals, and the archive of syllabi.",
    },
  },
];

export const audiences: { href: string; title: Localized; text: Localized; link: Localized }[] = [
  {
    href: "/education/courses",
    title: { ru: "Студентам", en: "Students" },
    text: {
      ru: "Курсы, расписание, практикумы и путь в лабораторию через студенческое общество.",
      en: "Courses, the timetable, practicals, and a route into a laboratory through the student society.",
    },
    link: { ru: "Курсы и дисциплины", en: "Courses" },
  },
  {
    href: "/students#admissions",
    title: { ru: "Абитуриентам", en: "Applicants" },
    text: {
      ru: "Как устроены бакалаврский профиль, магистратура и аспирантура и что приложить к портфолио.",
      en: "How the bachelor’s profile, master’s, and doctoral programme are organised, and what to put in a portfolio.",
    },
    link: { ru: "Поступление", en: "Admissions" },
  },
  {
    href: "/research/projects",
    title: { ru: "Исследователям", en: "Researchers" },
    text: {
      ru: "Направления, действующие проекты и формат, в котором кафедра обсуждает совместную работу.",
      en: "Research themes, active projects, and the way the department discusses collaboration.",
    },
    link: { ru: "Проекты и гранты", en: "Projects and grants" },
  },
];

export const partners: { name: Localized; text: Localized }[] = [
  {
    name: { ru: "Центр сравнительной морфологии", en: "Centre for Comparative Morphology" },
    text: {
      ru: "Общие коллекции ранних стадий и полевые сборы для сравнительных курсов.",
      en: "Shared early-stage collections and field samples for comparative courses.",
    },
  },
  {
    name: { ru: "Лаборатория световой микроскопии", en: "Light Microscopy Laboratory" },
    text: {
      ru: "Прижизненная съёмка и помощь в разборе морфогенетических рядов.",
      en: "Live imaging and help with morphogenetic series.",
    },
  },
  {
    name: { ru: "Кафедра зоологии позвоночных", en: "Department of Vertebrate Zoology" },
    text: {
      ru: "Совместные полевые практики и вводный курс по разнообразию развития.",
      en: "Joint field courses and the introductory course on developmental diversity.",
    },
  },
  {
    name: { ru: "Семинар по биологии развития", en: "Developmental Biology Seminar" },
    text: {
      ru: "Ежегодная встреча групп, где студенты докладывают рядом с приглашёнными коллегами.",
      en: "An annual meeting where students present alongside invited colleagues.",
    },
  },
];

export const faq: { q: Localized; a: Localized }[] = [
  {
    q: {
      ru: "Можно ли прийти в лабораторию на бакалавриате?",
      en: "Can an undergraduate join a laboratory?",
    },
    a: {
      ru: "Да, обычно со второго или третьего курса. Сначала студент посещает семинар группы и берёт небольшую описательную или количественную задачу. Место зависит от загрузки лаборатории, а не от формального конкурса баллов.",
      en: "Yes, usually from the second or third year. A student first attends the group seminar and takes a small descriptive or quantitative task. A place depends on laboratory capacity, not on a formal score contest.",
    },
  },
  {
    q: {
      ru: "Как выбрать научного руководителя?",
      en: "How do I choose a supervisor?",
    },
    a: {
      ru: "Посмотрите направления и последние работы на сайте, придите на семинар и напишите короткое письмо: что уже умеете и какой вопрос вам близок. Руководитель отвечает, есть ли задача на ближайший семестр.",
      en: "Read the themes and recent work on this site, come to a seminar, and send a short note: what you can already do and which question is close to you. The supervisor replies if there is a task for the coming term.",
    },
  },
  {
    q: {
      ru: "На каком языке идёт обучение?",
      en: "What is the language of instruction?",
    },
    a: {
      ru: "Основные курсы читаются по-русски. Семинар магистратуры и аспирантуры проходит на русском и английском: статьи разбираем в оригинале. Письменные работы можно готовить на любом из двух языков по согласованию.",
      en: "Core courses are taught in Russian. The master’s and doctoral seminar runs in Russian and English, and papers are read in the original. Written work may be prepared in either language by agreement.",
    },
  },
  {
    q: {
      ru: "Что входит в портфолио магистратуры?",
      en: "What goes into a master’s portfolio?",
    },
    a: {
      ru: "Диплом или выписка оценок, мотивационное письмо на одну-две страницы и, если есть, текст курсовой или тезис доклада. Отдельный публикационный список не обязателен. Дальше — собеседование по биологии развития.",
      en: "A diploma or transcript, a one- or two-page motivation letter, and, if you have it, a coursework paper or an abstract of a talk. A publication list is not required. An interview in developmental biology follows.",
    },
  },
  {
    q: {
      ru: "Кафедра консультирует пациентов?",
      en: "Does the department advise patients?",
    },
    a: {
      ru: "Нет. Мы учебное и исследовательское подразделение. Вопросы о здоровье нужно задавать врачу. Научные группы, с которыми мы сотрудничаем, тоже не записывают на приём через этот сайт.",
      en: "No. This is a teaching and research unit. Health questions belong with a physician. Research groups we collaborate with do not book appointments through this site.",
    },
  },
  {
    q: {
      ru: "Как предложить совместное исследование?",
      en: "How do I propose a collaboration?",
    },
    a: {
      ru: "Напишите на адрес кафедры: вопрос, модель, срок и что именно вы ждёте от нас — доступ к коллекции, съёмку, совместного студента или семинар. Письмо прочтёт заместитель по науке.",
      en: "Write to the department address with the question, the model, the timeframe, and what you want from us: a collection, imaging, a shared student, or a seminar. The deputy for research reads these letters.",
    },
  },
];

export const studentsPage = {
  admissions: [
    {
      title: { ru: "Бакалавриат", en: "Bachelor’s" },
      text: {
        ru: "Профиль кафедры открыт внутри направления «Биология». На первых курсах студенты проходят общее биологическое ядро, затем выбирают эмбриологию как профиль и приходят на практикум по ранним стадиям.",
        en: "The department’s profile sits inside the Biology degree. Students first take the shared biological core, then choose embryology and join the practical course on early stages.",
      },
    },
    {
      title: { ru: "Магистратура", en: "Master’s" },
      text: {
        ru: "Программа «Биология развития» рассчитана на два года. Отбор — по портфолио и собеседованию. Готовый экспериментальный задел полезен, но не заменяет ясный вопрос.",
        en: "The Developmental Biology programme takes two years. Selection is by portfolio and interview. Prior experimental work helps, but it does not replace a clear question.",
      },
    },
    {
      title: { ru: "Аспирантура", en: "Doctoral programme" },
      text: {
        ru: "Подготовка ведётся по научной специальности 1.5.23 «Биология развития, эмбриология». К заявке нужны план исследования, согласие руководителя и справка о сданных специальных экзаменах по правилам университета.",
        en: "Training follows the research specialty 1.5.23, Developmental Biology and Embryology. An application needs a research plan, a supervisor’s agreement, and the special examinations required by the university.",
      },
    },
  ] satisfies { title: Localized; text: Localized }[],
  society: {
    title: { ru: "Студенческое научное общество «Морфогенез»", en: "Morphogenesis student society" },
    text: {
      ru: "Общество собирается дважды в месяц. На одной встрече разбирают статью, на другой — короткие сообщения о собственных задачах. Туда можно прийти до того, как появится формальный руководитель.",
      en: "The society meets twice a month. One meeting reads a paper, the other hears short reports on students’ own tasks. You can come before you have a formal supervisor.",
    },
  },
  opportunities: [
    {
      ru: "Семестровая задача в одной из трёх лабораторий: описание ряда, измерения или разбор уже снятого фильма.",
      en: "A term-long task in one of the three laboratories: a descriptive series, measurements, or analysis of an existing recording.",
    },
    {
      ru: "Летняя практика на коллекции или в группе визуализации.",
      en: "A summer placement with the collection or the imaging group.",
    },
    {
      ru: "Доклад на кафедральном семинаре и помощь в подготовке стенда для студенческой сессии.",
      en: "A talk at the departmental seminar and help preparing a poster for the student session.",
    },
  ] satisfies Localized[],
};

export const contactTopics = [
  { id: "admission", label: { ru: "Поступление", en: "Admissions" } },
  { id: "study", label: { ru: "Учёба и расписание", en: "Study and timetable" } },
  { id: "research", label: { ru: "Исследования и сотрудничество", en: "Research and collaboration" } },
  { id: "other", label: { ru: "Другое", en: "Other" } },
] satisfies { id: string; label: Localized }[];
