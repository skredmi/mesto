export class UserInfo {
    constructor(userName, userJob) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo(result) {
        this._result = result;
        this._userProfile = {};
        this._userProfile = this._userName.textContent;
        this._userProfile = this._userJob.textContent;

        return this._userProfile;
    }

    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._userJob.textContent = about;
    }
}