import axios from "axios";

export default (options, requestOptions = {}) => {
  return axios(options);
};
