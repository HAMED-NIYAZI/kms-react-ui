import api from "../api/api";


class AuthService {
    async login(formData:{userName:string, password:string}) {
        return await api.post(`api/Account/Login`, {
            userName: formData.userName,
            password: formData.password,
        });
    }
    // async register(formData) {
    //     return await api.post(`api/Account/RequestRegister`, formData);
    // }
    async getInfoForLoginPage() {
        return await api.get(`api/Home/GetLoginPageSetting`);
    }
}

export default new AuthService