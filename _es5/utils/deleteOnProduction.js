export default (data => {
  if (process.env.NODE_ENV == "production") return;
  return data;
});