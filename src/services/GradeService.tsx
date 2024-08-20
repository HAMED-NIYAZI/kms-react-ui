import api from "../api/api";
class Grade {
  async index() {
    return await api.get(`api/Grade/GetAll`);
  }
  async create(data: any) {
    return await api.post(`api/Grade/Add`, data);
  }
  async getById(id: string) {
    return await api.get(`api/Grade/GetById/${id}`);
  }
  async update(data: any) {
    return await api.put(`api/Grade/update`, data);
  }
  async delete(id: string) {
    return await api.delete(`api/Grade/DeleteById/${id}`);
  }
}

export default new Grade();
