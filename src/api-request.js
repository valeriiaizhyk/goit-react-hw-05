import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export default async function fetchData(endpoint, query = {}) {
  const response = await axios.get(endpoint, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTdhMjFmMjI5NDFiMjRmNDMzZDUzYmVhYjYxYjc3OCIsInN1YiI6IjY2MGZkNmJkMDc4ZTRlMDE2NDk2MDkzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z6G_kBTbrflisW7Y8k6obiRDbcy6hdvcRddhbzjlWjY",
    },
    params: {
      query,
    },
  });
  return response.data;
}
