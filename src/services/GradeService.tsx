import api from "../api/api";

class Grade {
  async index() {
    return await api.get(`api/Grade/GetAll`);
  }
  async create(data: Omit<GradeType, "id">) {
    return await api.post(`api/Grade/Add`, data);
  }
  async getById(id: GradeType["id"]) {
    return await api.get(`api/Grade/GetById/${id}`);
  }
  async update(data: GradeType) {
    return await api.put(`api/Grade/update`, data);
  }
  async delete(id: Omit<GradeType, "id">) {
    return await api.delete(`api/Grade/DeleteById/${id}`);
  }
}

export default new Grade();

export type GradeType = {
  id: string;
  gradeName: string;
  sortingNumber: number;
};
