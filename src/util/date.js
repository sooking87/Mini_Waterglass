export const getStringDate = (date) => {
  console.log("getStringDate", date.toISOString().slice(0, 10));
  return date.toISOString().slice(0, 10);
};
