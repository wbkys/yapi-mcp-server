import axios, { AxiosInstance } from 'axios';
import type {
  GetProjectRequest,
  AddCatRequest,
  GetCatMenuRequest,
  ImportDataRequest,
  GetInterfaceRequest,
  ListCatRequest,
  AddInterfaceRequest,
  SaveInterfaceRequest,
  ListInterfacesRequest,
  UpdateInterfaceRequest,
  ListMenuRequest,
  YApiResponse
} from './types.js';

export class YApiClient {
  private baseURL: string;
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/$/, '');
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getProject(params: GetProjectRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/project/get', { params });
    return response.data;
  }

  async addCat(data: AddCatRequest): Promise<YApiResponse> {
    const response = await this.client.post<YApiResponse>('/api/interface/add_cat', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  }

  async getCatMenu(params: GetCatMenuRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/interface/getCatMenu', { params });
    return response.data;
  }

  async importData(data: ImportDataRequest): Promise<YApiResponse> {
    const response = await this.client.post<YApiResponse>('/api/open/import_data', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  }

  async getInterface(params: GetInterfaceRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/interface/get', { params });
    return response.data;
  }

  async listCat(params: ListCatRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/interface/list_cat', { params });
    return response.data;
  }

  async addInterface(data: AddInterfaceRequest): Promise<YApiResponse> {
    const response = await this.client.post<YApiResponse>('/api/interface/add', data);
    return response.data;
  }

  async saveInterface(data: SaveInterfaceRequest): Promise<YApiResponse> {
    const response = await this.client.post<YApiResponse>('/api/interface/save', data);
    return response.data;
  }

  async listInterfaces(params: ListInterfacesRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/interface/list', { params });
    return response.data;
  }

  async updateInterface(data: UpdateInterfaceRequest): Promise<YApiResponse> {
    const response = await this.client.post<YApiResponse>('/api/interface/up', data);
    return response.data;
  }

  async listMenu(params: ListMenuRequest): Promise<YApiResponse> {
    const response = await this.client.get<YApiResponse>('/api/interface/list_menu', { params });
    return response.data;
  }
}
