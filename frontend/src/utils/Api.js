import {IS_DEVELOPMENT} from "./IS_DEVELOPMENT";

export class Api {
    constructor({baseUrl, headers, otherCommonProps}) {
        this._baseUrl = baseUrl
        this._headers = headers
        this._otherCommonProps = otherCommonProps

        this._putLike = this._putLike.bind(this)
        this._deleteLike = this._deleteLike.bind(this)
        this.removeCard = this.removeCard.bind(this)
    }

    _parseJson(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            ...this._otherCommonProps,
        }).then(this._parseJson)
    }

    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            ...this._otherCommonProps,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._parseJson)
    }

    removeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            ...this._otherCommonProps,
        }).then(this._parseJson)
    }

    _putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            ...this._otherCommonProps,
        }).then(this._parseJson)
    }

    _deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            ...this._otherCommonProps,
        }).then(this._parseJson)
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this._deleteLike(id) : this._putLike(id)
    }

    updateUserData({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            ...this._otherCommonProps,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._parseJson)
    }

    updateUserImg({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            ...this._otherCommonProps,
            body: JSON.stringify({
                avatar,
            }),
        }).then(this._parseJson)
    }
}

export const api = new Api({
    baseUrl: IS_DEVELOPMENT ? 'http://localhost:4000' : 'https://api.blogogram.nomoreparties.sbs',
    headers: {
        authorization: '7a43c762-4e63-438c-856b-e056a5084ee3',
        'Content-Type': 'application/json',
    },
    otherCommonProps: {
        credentials: 'include'
    }
})
