import axios from "axios";

const hit = async () => {
  const response = await axios.post("/hit");
  return response.data;
};

const stand = async () => {
  const response = await axios.post("/stand");
  return response.data;
};

const newGame = async () => {
  const response = await axios.get("/newGame");
  return response.data;
};

export default { hit, stand, newGame };
