import _ from "lodash";
import request from "../utils/request";
const base_URL = "https://be-invitation-gempor.herokuapp.com/invitation/";

const urls = {
  get_all_guest: "guest",
  submitContact: "contact/order",
  post_registration: "guest",
  post_gift_confirmation: "gift",
};

const callAPI = (endpoint, method, headers = {}, params = {}, data = {}) => {
  const options = {
    baseURL: base_URL,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data && response.data.data;
    return responseAPI;
  });
};

export const getAllGuest = () => {
  return callAPI(urls.get_all_guest, "get", {});
};

export const postRegistration = (guestData) => {
  return callAPI(urls.post_registration, "post", {}, {}, guestData);
};

export const postGiftConfirmation = (guestData) => {
  return callAPI(urls.post_gift_confirmation, "post", {}, {}, guestData);
};
