import axios from "axios";

const partyFetch = axios.create({
  baseURL: "https://event-manage-yv84.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default partyFetch;
