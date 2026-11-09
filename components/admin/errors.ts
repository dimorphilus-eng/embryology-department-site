const messages: Record<string, string> = {
  auth: "Сессия истекла. Войдите снова.",
  invalid: "Проверьте поля: нужен русский текст, дата и адрес из латиницы.",
  taken: "Такой адрес уже занят.",
  missing: "Запись не найдена.",
  file: "Файл не принят.",
  type: "Можно загрузить JPG, PNG, WEBP, GIF или PDF.",
  size: "Файл больше 8 МБ.",
  unconfigured: "На сервере не задан пароль ADMIN_PASSWORD.",
  limited: "Слишком много попыток. Подождите несколько минут.",
};

export function adminError(code: string | undefined) {
  if (!code) return "Не получилось сохранить.";
  return messages[code] ?? "Не получилось сохранить.";
}
