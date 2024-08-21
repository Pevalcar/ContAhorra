export const formatValue = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });
  return formatter.format(value);
};
