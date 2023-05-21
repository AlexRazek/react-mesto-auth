import Api from "../utils/Api.js";

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    "Content-type": "application/json",
    authorization: "940ae192-79e3-4af0-9ee8-6874bf99bd0d",
  },
});
