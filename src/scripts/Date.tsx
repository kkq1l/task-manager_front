export const dateConvert = (body: string) => {
  const date = new Date(body);

  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
