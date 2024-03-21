import { BASE_URL } from "./config";

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async getUserInfo(token) {
        try {
            const response = await fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                    ...this._headers,
                    authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error:${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }


    async getCardList(token) {
        try {
            const response = await fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: {
                    ...this._headers,
                    authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error:${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async handleEditProfile(body, token) {
        const {name, about} = body;
        try {
            const response = await fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    ...this._headers,
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    about: about,
                }),
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error:${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async addCard(body,token) {
        const { title,src } = body;
        try {
            const response = await fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    ...this._headers,
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: title,
                    link: src,
                }),
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error:${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async removeCard(cardId, token) {

        try {
            const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    ...this._headers,
                    authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error:${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    

    async changeLikeCardStatus(cardId, isLiked, token) {
        try {
          let response;
          if (isLiked) {
            response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
              method: 'DELETE',
              headers: {
                ...this._headers,
                authorization: `Bearer ${token}`,
              },
            });
          } else {
            response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
              method: 'PUT',
              headers: {
                ...this._headers,
                authorization: `Bearer ${token}`,
              },
            });
          }
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(`Error ${response.status}`);
          }
        } catch (error) {
          throw new Error(`${error}`);
        }
      }


    async editUserAvatar(avatar, token) {
        try {
            const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
            });
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Error ${response.status}`);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

}


const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;