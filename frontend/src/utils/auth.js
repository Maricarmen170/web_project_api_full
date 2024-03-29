import { BASE_URL } from "./config";

export const registerUser = ( email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,password }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    })
    .catch(err => console.log(err))
};


  export const checkToken = (token) => {

    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Error: ${res.status}`);
        }
    });
  };