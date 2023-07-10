import {IS_DEVELOPMENT} from "./IS_DEVELOPMENT";

export class AuthApi {
    constructor({baseUrl, headers, otherCommonProps}) {
        this._baseUrl = baseUrl
        this._headers = headers
        this._otherCommonProps = otherCommonProps
    }

    _parseJson(res) {
        return res.ok ? res.json() : Promise.reject(res)
    }

    postSignUp({password, email}) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            ...this._otherCommonProps,

            body: JSON.stringify({
                password,
                email,
            }),
        }).then(this._parseJson)
    }

    postSignOut() {
        return fetch(`${this._baseUrl}/sign-out`, {
            method: 'POST',
            headers: this._headers,
            ...this._otherCommonProps,

        }).then(this._parseJson)
    }

    postSignIn({password, email}) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            ...this._otherCommonProps,

            body: JSON.stringify({
                password,
                email,
            }),
        }).then(this._parseJson)
    }

    getUsersMe() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            ...this._otherCommonProps,

        }).then(this._parseJson)
    }
}

export const authApi = new AuthApi({
    baseUrl: IS_DEVELOPMENT ? 'http://localhost:4000' : 'https://blogogram.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json',
    },
    otherCommonProps: {
        credentials: 'include'
    }
})
