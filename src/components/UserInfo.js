export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._about.textContent = userData.about;
        this._avatar.src = userData.avatar;
    }
}