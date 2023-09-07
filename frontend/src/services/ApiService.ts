import { Axios } from "axios";

class ApiService {
    private axios: Axios
    private baseUrl: string = 'http://localhost:3001'; 

    constructor() {
        this.axios = new Axios({
            baseURL: this.baseUrl
        })
    }

    listQueries = async () => {
        const response = await this.axios.get("/queries")
        return JSON.parse(response.data);
    }

    getQuery = async (id: string | number) => {
        const response = await this.axios.get(`/queries/${id}`)
        return JSON.parse(response.data);
    }

    createQuery = async (data: any) => {
        const result = await fetch(`${this.baseUrl}/queries`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':  'application/json'
            }
        })

        if(!result.ok) {
            throw new Error('Requisição com erro');
        }

        return result.json();
    }

    updateQuery = async (id: string | number, data: any) => {
        const response = await this.axios.put(`/queries/${id}`, data)
        return JSON.parse(response.data);
    }

    deleteQuery = async (id: string | number) => {
        const response = await this.axios.delete(`/queries/${id}`);
        return JSON.parse(response.data);
    }

    listEmployees = async () => {
        const response = await this.axios.get("/employees")
        return JSON.parse(response.data);
    }

    getEmployee = async (id: string | number) => {
        const response = await this.axios.get(`/employees/${id}`)
        return JSON.parse(response.data);
    }

    createEmployee = async (data: any) => {
        const result = await fetch(`${this.baseUrl}/employees`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':  'application/json'
            }
        })

        if(!result.ok) {
            throw new Error('Requisição com erro');
        }

        return result.json();
    }

    updateEmployee = async (id: string | number, data: any) => {
        const response = await this.axios.put(`/employees/${id}`, data)
        return JSON.parse(response.data);
    }

    deleteEmployee = async (id: string | number) => {
        const response = await this.axios.delete(`/employees/${id}`);
        return JSON.parse(response.data);
    }

}

const apiService = await new ApiService();
export default apiService;