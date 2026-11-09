import type { Localized } from "@/lib/i18n";

export type PositionGroup = "head" | "professor" | "associate" | "assistant" | "researcher";

export type Person = {
  slug: string;
  name: Localized;
  degree: Localized;
  position: Localized;
  positionGroup: PositionGroup;
  directions: string[];
  interests: Localized;
  tags: Localized[];
  bio: Localized;
  email: string;
  phone: string;
  orcid: string;
  scopus: string;
  office: Localized;
  courses: string[];
};

export const people: Person[] = [
  {
    slug: "elena-sokolova",
    name: { ru: "Елена Викторовна Соколова", en: "Elena V. Sokolova" },
    degree: { ru: "доктор биологических наук", en: "DSc in Biology" },
    position: { ru: "заведующий кафедрой, профессор", en: "Head of department, Professor" },
    positionGroup: "head",
    directions: ["axial"],
    interests: {
      ru: "Сигнальные центры, осевая организация зародыша позвоночных и количественное описание ранней гаструляции.",
      en: "Signaling centers, axial organization of the vertebrate embryo, and quantitative description of early gastrulation.",
    },
    tags: [
      { ru: "осевой паттернинг", en: "axial patterning" },
      { ru: "гаструляция", en: "gastrulation" },
      { ru: "Xenopus", en: "Xenopus" },
    ],
    bio: {
      ru: "Руководит кафедрой с 2016 года. Исследует, как сигнальные центры задают оси зародыша, и собирает количественные карты ранних морфогенетических движений. Ведёт вводный курс эмбриологии и семинар аспирантов.",
      en: "Has led the department since 2016. Studies how signaling centers set the embryonic axes and builds quantitative maps of early morphogenetic movements. Teaches the introductory embryology course and the doctoral seminar.",
    },
    email: "e.sokolova@example.edu",
    phone: "+7 (495) 000-11-21",
    orcid: "0000-0003-1841-0101",
    scopus: "57200001001",
    office: { ru: "корпус «Био», каб. 312", en: "Building B, room 312" },
    courses: ["intro-embryology", "doctoral-seminar"],
  },
  {
    slug: "andrey-levin",
    name: { ru: "Андрей Павлович Левин", en: "Andrey P. Levin" },
    degree: { ru: "доктор биологических наук", en: "DSc in Biology" },
    position: { ru: "профессор, заместитель по науке", en: "Professor, Deputy for research" },
    positionGroup: "professor",
    directions: ["germline"],
    interests: {
      ru: "Первичные половые клетки, миграция и ранняя дифференцировка клеток зародышевой линии.",
      en: "Primordial germ cells, migration, and early differentiation of the germline.",
    },
    tags: [
      { ru: "зародышевая линия", en: "germline" },
      { ru: "миграция клеток", en: "cell migration" },
      { ru: "гаметогенез", en: "gametogenesis" },
    ],
    bio: {
      ru: "Заместитель заведующего по науке. Занимается тем, как первичные половые клетки находят место и сохраняют идентичность. Координирует отчёты по проектам и программу семинара кафедры.",
      en: "Deputy head for research. Works on how primordial germ cells find their place and keep their identity. Coordinates project reporting and the departmental seminar programme.",
    },
    email: "a.levin@example.edu",
    phone: "+7 (495) 000-11-22",
    orcid: "0000-0003-1841-0102",
    scopus: "57200001002",
    office: { ru: "корпус «Био», каб. 314", en: "Building B, room 314" },
    courses: ["molecular-development", "doctoral-seminar"],
  },
  {
    slug: "maria-zhang",
    name: { ru: "Мария Игоревна Чжан", en: "Maria I. Zhang" },
    degree: { ru: "кандидат биологических наук", en: "PhD (Cand. Sci.) in Biology" },
    position: { ru: "доцент", en: "Associate Professor" },
    positionGroup: "associate",
    directions: ["organs"],
    interests: {
      ru: "Раннее поле сердца, асимметрия лево-право и морфогенез сердечной трубки у амниот.",
      en: "The early heart field, left–right asymmetry, and morphogenesis of the heart tube in amniotes.",
    },
    tags: [
      { ru: "органогенез", en: "organogenesis" },
      { ru: "сердце", en: "heart" },
      { ru: "асимметрия", en: "asymmetry" },
    ],
    bio: {
      ru: "Ведёт курс органогенеза и практикум по зародышам амниот. В лаборатории разбирает, как сердечное поле складывается в трубку и откуда берётся лево-правая асимметрия.",
      en: "Teaches organogenesis and the amniote embryo practical. In the laboratory, studies how the heart field folds into a tube and where left–right asymmetry comes from.",
    },
    email: "m.zhang@example.edu",
    phone: "+7 (495) 000-11-23",
    orcid: "0000-0003-1841-0103",
    scopus: "57200001003",
    office: { ru: "корпус «Био», каб. 221", en: "Building B, room 221" },
    courses: ["organogenesis", "methods"],
  },
  {
    slug: "sergey-nikitin",
    name: { ru: "Сергей Олегович Никитин", en: "Sergey O. Nikitin" },
    degree: { ru: "кандидат биологических наук", en: "PhD (Cand. Sci.) in Biology" },
    position: { ru: "доцент, заместитель по учебной работе", en: "Associate Professor, Deputy for education" },
    positionGroup: "associate",
    directions: ["neural"],
    interests: {
      ru: "Закрытие нервной трубки, механика эпителия и учебные коллекции по нейруляции.",
      en: "Neural tube closure, epithelial mechanics, and teaching collections of neurulation.",
    },
    tags: [
      { ru: "нейруляция", en: "neurulation" },
      { ru: "механика тканей", en: "tissue mechanics" },
      { ru: "учебные коллекции", en: "teaching collections" },
    ],
    bio: {
      ru: "Отвечает за учебный план и расписание. Исследует механику закрытия нервной трубки и следит за тем, чтобы практикум оставался описательно точным, а не только молекулярным.",
      en: "Responsible for the curriculum and timetable. Studies the mechanics of neural tube closure and keeps the practical course descriptively precise, not only molecular.",
    },
    email: "s.nikitin@example.edu",
    phone: "+7 (495) 000-11-24",
    orcid: "0000-0003-1841-0104",
    scopus: "57200001004",
    office: { ru: "корпус «Био», каб. 210", en: "Building B, room 210" },
    courses: ["developmental-biology", "methods"],
  },
  {
    slug: "anna-volkova",
    name: { ru: "Анна Сергеевна Волкова", en: "Anna S. Volkova" },
    degree: { ru: "кандидат биологических наук", en: "PhD (Cand. Sci.) in Biology" },
    position: { ru: "старший научный сотрудник", en: "Senior Researcher" },
    positionGroup: "researcher",
    directions: ["regeneration"],
    interests: {
      ru: "Хвостовая почка, регенерация у амфибий и границы между эмбриональной и восстановительной пластичностью.",
      en: "The tail bud, amphibian regeneration, and the boundary between embryonic and restorative plasticity.",
    },
    tags: [
      { ru: "регенерация", en: "regeneration" },
      { ru: "хвостовая почка", en: "tail bud" },
      { ru: "амфибии", en: "amphibians" },
    ],
    bio: {
      ru: "Сравнивает, как хвостовая почка строится в эмбриогенезе и как похожий набор клеток ведёт себя при восстановлении. Руководит студенческими задачами по регенерации.",
      en: "Compares how the tail bud is built in embryogenesis with how a similar set of cells behaves during restoration. Supervises student projects on regeneration.",
    },
    email: "a.volkova@example.edu",
    phone: "+7 (495) 000-11-25",
    orcid: "0000-0003-1841-0105",
    scopus: "57200001005",
    office: { ru: "корпус «Био», лаб. 118", en: "Building B, lab 118" },
    courses: ["evo-devo"],
  },
  {
    slug: "dmitry-kim",
    name: { ru: "Дмитрий Артёмович Ким", en: "Dmitry A. Kim" },
    degree: { ru: "кандидат биологических наук", en: "PhD (Cand. Sci.) in Biology" },
    position: { ru: "научный сотрудник", en: "Researcher" },
    positionGroup: "researcher",
    directions: ["comparative"],
    interests: {
      ru: "Геометрия дробления, бластоцель и сравнительные ряды ранних стадий рыб и амфибий.",
      en: "Cleavage geometry, the blastocoel, and comparative series of early fish and amphibian stages.",
    },
    tags: [
      { ru: "сравнительная эмбриология", en: "comparative embryology" },
      { ru: "дробление", en: "cleavage" },
      { ru: "рыбы", en: "fishes" },
    ],
    bio: {
      ru: "Ведёт лабораторию сравнительной эмбриологии и коллекцию ранних стадий. Интересуется тем, как геометрия дробления связана с появлением полости.",
      en: "Leads the Laboratory of Comparative Embryology and the early-stage collection. Interested in how cleavage geometry relates to the appearance of a cavity.",
    },
    email: "d.kim@example.edu",
    phone: "+7 (495) 000-11-26",
    orcid: "0000-0003-1841-0106",
    scopus: "57200001006",
    office: { ru: "корпус «Био», лаб. 104", en: "Building B, lab 104" },
    courses: ["comparative"],
  },
  {
    slug: "olga-belova",
    name: { ru: "Ольга Николаевна Белова", en: "Olga N. Belova" },
    degree: { ru: "кандидат биологических наук", en: "PhD (Cand. Sci.) in Biology" },
    position: { ru: "ассистент", en: "Assistant Professor" },
    positionGroup: "assistant",
    directions: ["comparative"],
    interests: {
      ru: "Температурные окна развития и устойчивость сроков гаструляции у пойкилотермных позвоночных.",
      en: "Temperature windows of development and the robustness of gastrulation timing in poikilothermic vertebrates.",
    },
    tags: [
      { ru: "среда", en: "environment" },
      { ru: "сроки развития", en: "developmental timing" },
      { ru: "практикум", en: "practical course" },
    ],
    bio: {
      ru: "Ведёт практикум и помогает собрать расписание. В исследованиях смотрит, насколько сроки гаструляции удерживаются при сдвиге температуры, без перехода к прикладным токсикологическим протоколам.",
      en: "Teaches the practical course and helps assemble the timetable. Studies how far gastrulation timing holds when temperature shifts, without moving into applied toxicology protocols.",
    },
    email: "o.belova@example.edu",
    phone: "+7 (495) 000-11-27",
    orcid: "0000-0003-1841-0107",
    scopus: "57200001007",
    office: { ru: "корпус «Био», каб. 208", en: "Building B, room 208" },
    courses: ["intro-embryology", "comparative"],
  },
  {
    slug: "ilya-orlov",
    name: { ru: "Илья Максимович Орлов", en: "Ilya M. Orlov" },
    degree: { ru: "магистр биологии, аспирант", en: "MSc in Biology, doctoral student" },
    position: { ru: "младший научный сотрудник", en: "Junior Researcher" },
    positionGroup: "researcher",
    directions: ["axial"],
    interests: {
      ru: "Прижизненная съёмка гаструляции и разметка клеточных потоков на ранних стадиях.",
      en: "Live imaging of gastrulation and annotation of cell flows at early stages.",
    },
    tags: [
      { ru: "визуализация", en: "imaging" },
      { ru: "клеточные потоки", en: "cell flows" },
      { ru: "гаструляция", en: "gastrulation" },
    ],
    bio: {
      ru: "Аспирант лаборатории раннего развития. Собирает и размечает фильмы гаструляции, чтобы карты движений можно было сравнивать между опытами.",
      en: "Doctoral student in the Laboratory of Early Development. Records and annotates gastrulation movies so movement maps can be compared across experiments.",
    },
    email: "i.orlov@example.edu",
    phone: "+7 (495) 000-11-28",
    orcid: "0000-0003-1841-0108",
    scopus: "57200001008",
    office: { ru: "корпус «Био», лаб. 118", en: "Building B, lab 118" },
    courses: ["methods"],
  },
];

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}
