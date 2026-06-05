import axios from "axios";

function handleAxiosError(error){
  if (axios.isAxiosError(error) && error.response) {
    const errorMessage = error.response.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
  throw error;
}

export function getProductData(id) {

    return axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        return response.data;
    })
}



export function getProductsList(sortBy, order, page) {

   let url = "https://dummyjson.com/products?limit=12";
  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }
  if (page) {
    url += `&skip=${(page - 1) * 12}`;
  }
  return axios
    .get(url)
    .then((response) => response.data)
    
    
    .catch(handleAxiosError);
    
}



export function searchProducts(query, sortBy, order, page){
  let url = `https://dummyjson.com/products/search?q=${query}&limit=12`;
  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }
  if (page) {
    url += `&skip=${(page - 1) * 12}`;
  }
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(handleAxiosError);
}




export function addUser(firstName, email, password) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/signup";
  const data = {
    firstName,
    email,
    password,
  };
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
    .catch(handleAxiosError);
}

export function signInUser(email, password) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/signin";
  const data = {
    email,
    password,
  };
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
    .catch(handleAxiosError);
}


export function authUser(token) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/me";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  };

  return axios
    .get(url, config)
    .then((response) => {
      if (response.status >= 400) {
        const errorMessage = response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      return response.data;
    })
    .catch(handleAxiosError);
}

export function saveCart(cart , token) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/cart";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  };

  return axios
    .post(url, cart, config)
    .then((response) => {
      if (response.status >= 400) {
        const errorMessage = response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      return response.data;
    })
    .catch(handleAxiosError);
}

export function getCart(token)  {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/cart";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  };

  return axios
    .get(url, config)
    .then((response) => {
      if (response.status >= 400) {
        const errorMessage = response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      return response.data;
    })
    .catch(handleAxiosError);
}