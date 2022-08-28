import _ from "lodash";

const removeDash = (word) => {
  word = _.replace(word, "-", " ");
  return word;
};
export { removeDash };
