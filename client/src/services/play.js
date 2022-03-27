import axios from "axios";

const hit = async () => {
  const response = await axios.get("/hit");
  return response;
};

const stand = async () => {
  const response = await axios.get("/stand");
  return response;
};

export { hit, stand };
