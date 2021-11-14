import axios from "axios";

const instance = axios.create({
  baseURL: "https://limitless-fjord-33013.herokuapp.com",
  timeout: 5000,
});

const requests = {
  get: (url) => instance.get(url).then((response) => response.data),
  post: (url, body) =>
    instance.post(url, body).then((response) => response.data),
  patch: (url, body) =>
    instance.patch(url, body).then((response) => response.data),
  delete: (url) => instance.delete(url).then((response) => response.data),
};
export default requests;
