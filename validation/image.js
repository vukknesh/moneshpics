const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateImageInput(data) {
  let errors = {};

  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : "";

  if (!Validator.isLength(data.imageUrl, { min: 10, max: 300 })) {
    errors.imageUrl = "Image must have a url";
  }
  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = "Url field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
