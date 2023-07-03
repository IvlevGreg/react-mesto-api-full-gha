export class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _parseJson(res) {
    return res.ok ? res.json() : Promise.reject(res)
  }

  postSignUp({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._parseJson)
  }

  postSignIn({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._parseJson)
  }

  getUsersMe(JWT) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${JWT}` },
    }).then(this._parseJson)
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
})
