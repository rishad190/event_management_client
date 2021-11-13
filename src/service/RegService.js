import requests from "./httpService";

class RegService {
  getUser = () => {
    return requests.get("/users");
  };

  getUserByID = (id) => {
    return requests.get(`/users/${id}`);
  };

  addUser = (body) => {
    return requests.post(`/users`, body);
  };

  updateUser = (id, body) => {
    return requests.patch(`/users/${id}`, body);
  };

  deleteUserByID = (id) => {
    return requests.delete(`/users/${id}`);
  };
}
export default new RegService();
