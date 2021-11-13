import requests from "./httpService";

class EventService {
  getEvent = () => {
    return requests.get("/events");
  };

  getEventByID = (id) => {
    return requests.get(`/events/${id}`);
  };

  addEvent = (body) => {
    return requests.post(`/events`, body);
  };

  updateEvent = (id, body) => {
    return requests.patch(`/events/${id}`, body);
  };

  deleteEventByID = (id) => {
    return requests.delete(`/events/${id}`);
  };
}
export default new EventService();
