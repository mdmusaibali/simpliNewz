export const getNews = async (country, key, category, page) => {
  console.log("getNews called");
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}&category=${category}&page=${page}`
  );
  console.log("Success");
  return response;
};
