import request from "./request";

export const getProducts = () => {
  return request({
    path: "products",
    method: "get",
  });
};
export const sendProposal = (payload: any) => {
  return {
    path: " products",
    method: "post",
    payload: payload,
  };
};
