import requests from "./httpService";

class EventBookService {
  getEventBook = () => {
    return requests.get("/eventsBook");
  };

  getEventBookByID = (id) => {
    return requests.get(`/eventsBook/${id}`);
  };

  addEventBook = (body) => {
    return requests.post(`/eventsBook`, body);
  };

  updateEventBook = (id, body) => {
    return requests.patch(`/eventsBook/${id}`, body);
  };

  deleteEventBookByID = (id) => {
    return requests.delete(`/eventsBook/${id}`);
  };
}
export default new EventBookService();
