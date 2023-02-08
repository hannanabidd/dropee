// import { BASE_URL } from "config/apiConfig";
import { IReqProps } from "./api";

const request = async ({ path, method, payload }: IReqProps) => {
  try {
    const url = `https://fakestoreapi.com/${path}`;
    const response = await fetch(url, {
      method: `${method}`,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default request;
