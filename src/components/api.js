export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleOriginalResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._handleOriginalResponse);
    }

    getUserProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._handleOriginalResponse);
    }

    changeUserProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            'Content-Type': 'application/json',
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._handleOriginalResponse);
    }

    avatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._handleOriginalResponse);

    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            'Content-Type': 'application/json',
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._handleOriginalResponse);
    }

    getLike(_id) {
        return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._handleOriginalResponse);
    }

    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleOriginalResponse);
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleOriginalResponse);
    }
}