import api from "../api/api";

class ChartService {
  async getChartTree() {
    return await api.get(`/api/Chart/GetChartTree`);
  }
  async getOrganizationChartTree(id: Chart["id"]) {
    return await api.get(
      `/api/Chart/GetChartTreeWithOrganizationId?organizationId=${id}`
    );
  }
  async create(data: Chart) {
    return await api.post(`api/Chart/Add`, data);
  }
  async update(data: Chart) {
    return await api.put(`api/Chart/Update`, data);
  }
  async delete(id: Chart["id"]) {
    return await api.delete(`api/Chart/DeleteById/${id}`);
  }
  async getById(id: Chart["id"]) {
    return await api.get(`api/Chart/GetById/${id}`);
  }
}

export default new ChartService();

export type Chart = {
  children?: Chart[] | [];
  id?: string;
  isSelected?: boolean;
  organizationId: string;
  parentId: string | null;
  persianTitle: string;
  sortingNumber: number;
};
