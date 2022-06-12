import { message } from "antd";
import axios from "axios";

// let baseUrl = "https://movies-app-backend-mongodb.herokuapp.com/api";
let baseUrl = "https://movies-app-backend-mongodb1.herokuapp.com/api";
export const SignUp = async (data) => {
  console.log(data);
  await axios
    .post(baseUrl + "/user/signin", data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("login", res.data.token);
    })
    .catch((err) => message.error("Internal Error"));
};

export const Login = async (data) => {
  console.log(data);
  await axios
    .post(baseUrl + "/user/login", data)
    .then((res) => {
      console.log(res);
      localStorage.setItem("login", res.data.token);
    })
    .catch((err) => message.error("Internal Error"));
};

export const Logout = async () => {
  // await axios.get(baseUrl + "/user/logout", {
  //   withCredentials: true,
  // });

  localStorage.clear();
};

export const CreateWatchList = async (data) => {
  console.log(data);
  await axios
    .post(baseUrl + "/favourites/create", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("tempList", res.data);
    })
    .catch((err) => message.error("Internal Error"));
};

export const PushToWatchList = async (data) => {
  console.log(data);
  await axios
    .post(baseUrl + "/favourites/update", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => message.error("Internal Error"));
};

export const ChangePublicAvailibility = async (data) => {
  console.log(data);
  await axios
    .post(baseUrl + "/favourites/changeStatus", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => message.error("Internal Error"));
};

export const getWatchlists = async () => {
  await axios
    .get(baseUrl + "/favourites/getWatchlists", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
    .then((res) => {
      //console.log(JSON.stringify(res.data?.watchlist));
      localStorage.setItem("watchlist", JSON.stringify(res.data?.watchlist));
    })
    .catch((err) => console.log(err));
};

export const getPublicWatchlists = async (data) => {
  await axios
    .post(baseUrl + "/favourites/getPublicWatchlists", data)
    .then((res) => {
      //console.log(JSON.stringify(res.data?.watchlist));
      localStorage.setItem(
        "Publicwatchlist",
        JSON.stringify(res.data?.watchlist)
      );
    })
    .catch((err) => message.error("Internal Error"));
};
