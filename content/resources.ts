import type { Localized } from "@/lib/i18n";

export type ResourceLink = {
  title: string;
  href: string;
  text: Localized;
};

export const resourceGroups: { id: string; title: Localized; note: Localized; links: ResourceLink[] }[] = [
  {
    id: "databases",
    title: { ru: "Базы модельных организмов", en: "Model-organism databases" },
    note: {
      ru: "Открытые справочники, с которых кафедра начинает работу по модели. Это внешние сайты, не ресурсы кафедры.",
      en: "Open references from which the department starts work on a model. These are external sites, not departmental systems.",
    },
    links: [
      {
        title: "Xenbase",
        href: "https://www.xenbase.org/",
        text: { ru: "Шпорцевая лягушка: гены, стадии, анатомия.", en: "Xenopus: genes, stages, anatomy." },
      },
      {
        title: "ZFIN",
        href: "https://zfin.org/",
        text: { ru: "Данные по данио.", en: "Zebrafish data." },
      },
      {
        title: "FlyBase",
        href: "https://flybase.org/",
        text: { ru: "Дрозофила, когда нужен сравнительный генетический контекст.", en: "Drosophila, when a comparative genetic context is needed." },
      },
      {
        title: "WormBase",
        href: "https://wormbase.org/",
        text: { ru: "C. elegans как линия сравнения по клеточным родословным.", en: "C. elegans as a comparison for cell lineages." },
      },
      {
        title: "MGI",
        href: "https://www.informatics.jax.org/",
        text: { ru: "Мышь: фенотипы и номенклатура.", en: "Mouse: phenotypes and nomenclature." },
      },
    ],
  },
  {
    id: "journals",
    title: { ru: "Журналы и общества", en: "Journals and societies" },
    note: {
      ru: "То, что стоит в семинарском списке. Доступ к полным текстам зависит от подписки университета.",
      en: "What sits on the seminar list. Access to full texts depends on the university subscription.",
    },
    links: [
      {
        title: "Development",
        href: "https://journals.biologists.com/dev",
        text: { ru: "Основной журнал семинара.", en: "The seminar’s main journal." },
      },
      {
        title: "Developmental Biology",
        href: "https://www.sciencedirect.com/journal/developmental-biology",
        text: { ru: "Статьи по морфогенезу и органогенезу.", en: "Papers on morphogenesis and organogenesis." },
      },
      {
        title: "International Society of Developmental Biologists",
        href: "https://www.developmental-biology.org/",
        text: { ru: "Международное общество и календарь встреч.", en: "The international society and its meeting calendar." },
      },
      {
        title: "Society for Developmental Biology",
        href: "https://www.sdbonline.org/",
        text: { ru: "Общество, учебные материалы и ежегодная конференция.", en: "The society, teaching materials, and the annual meeting." },
      },
    ],
  },
  {
    id: "library",
    title: { ru: "Библиотека кафедры", en: "Departmental library" },
    note: {
      ru: "Короткие PDF, которые можно скачать прямо сейчас. Это образцы программ, а не официальные документы университета.",
      en: "Short PDFs that can be downloaded now. They are sample programmes, not official university documents.",
    },
    links: [],
  },
];
