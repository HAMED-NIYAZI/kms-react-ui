import api from "../api/api";

class OrganizationService {
  async getOrganizationTree() {
    return await api.get(`/api/Organization/GetOrganizationTree`);
  }
  async create(data: any) {
    return await api.post(`api/Organization/Add`, data);
  }
  async getById(id: string) {
    return await api.get(`api/Organization/GetById/${id}`);
  }
  async update(data: any) {
    return await api.put(`api/Organization/update`, data);
  }
  async delete(id: string) {
    return await api.delete(`api/Organization/DeleteById/${id}`);
  }
}

export default new OrganizationService();
