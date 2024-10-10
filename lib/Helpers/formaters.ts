import { useTranslation } from "react-i18next";

export const formatValue = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });
  return formatter.format(value);
};

export const FormatedLocale = ({ date }: { date: any }) => {
  const { i18n } = useTranslation();
  const newDate = new Date(date);
  // ejemplo formato de fecha: Abr 03, Martes
  let formatMount = newDate.toLocaleString(i18n.language, { month: "short" });
  let formatDayWeek = newDate.toLocaleString(i18n.language, {
    weekday: "long",
  });

  formatMount = `${formatMount.charAt(0).toUpperCase()}${formatMount.slice(1)}`;
  formatDayWeek = `${formatDayWeek.charAt(0).toUpperCase()}${formatDayWeek.slice(1)}`;

  const formated = `${formatMount} ${newDate.toLocaleString(i18n.language, { day: "numeric" })}, ${formatDayWeek}`;
  return formated;
};
