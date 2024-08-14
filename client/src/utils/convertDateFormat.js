export const converDateFormat = (date) => {
  const newDate = new Date(date).toLocaleDateString();
  return newDate;
};
