import api from "../api/api";
class UserService {
  async updateProfile(formData: any) {
    return await api.post(`api/User/EditUserProfile`, formData);
  }
  async uploadAvatar(formData: any, userId: string) {
    return await api.post(
      `api/User/EditUserProfileImage?Id=${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
  async updatePassword(formData: any, userId: string) {
    return await api.post(
      `api/User/ChangePasswordByUser?Id=${userId}`,
      formData
    );
  }
}

export default new UserService();
