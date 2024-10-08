import api from "../api/api";
class KnowledgeFieldService {
    async getKnowledgeFieldTree() {
        return await api.get(`/api/KnowledgeField/GetKnowledgeFieldTree`);
    }
    async create(data: any) {
        return await api.post(`api/KnowledgeField/Add`, data);
    }
    async getById(id:string) {
        return await api.get(`api/KnowledgeField/GetById/${id}`);
    }
    async update(data: any) {
        return await api.put(`api/KnowledgeField/update`, data);
    }
    async delete(id:string) {
        return await api.delete(`api/KnowledgeField/DeleteById/${id}`);
    }
}

export default new KnowledgeFieldService();

