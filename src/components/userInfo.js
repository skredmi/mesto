export class UserInfo {
    constructor(userName, userJob) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        this._userProfile = {};
        this._userProfile.name = this._userName.textContent;
        this._userProfile.job = this._userJob.textContent;

        return this._userProfile;
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}