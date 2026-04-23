import axios from "axios";

export function getProductData(id) {

    return axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        return response.data;
    })
}

export function getProductsList() {

    return axios.get("https://dummyjson.com/products").then(function (response) {
        return response.data.products;
    }); // token return through function
}

export function addUser(firstName, email, password) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/signup";
  const data = {
    firstName,
    email,
    password,
  };
  console.log("adduser call hus",firstName, email, password  );
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: () => true,
  };

  return axios
    .post(url, data, config)
    .then((response) => {
      if (response.status >= 400) {
        const errorMessage = response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      throw error;
    });
}