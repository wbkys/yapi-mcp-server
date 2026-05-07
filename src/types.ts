// Request types
export interface GetProjectRequest {
  token: string;
}

export interface AddCatRequest {
  desc?: string;
  name: string;
  project_id: string;
  token: string;
}

export interface GetCatMenuRequest {
  project_id: string;
  token: string;
}

export interface ImportDataRequest {
  type: 'swagger' | 'postman' | 'har';
  json?: string;
  merge: 'normal' | 'good' | 'merge';
  token: string;
  url?: string;
}

export interface GetInterfaceRequest {
  id: string;
  token: string;
}

export interface ListCatRequest {
  token: string;
  catid: string;
  page?: number;
  limit?: number;
}

export interface AddInterfaceRequest {
  token: string;
  req_query?: Array<{name: string; desc?: string; required?: string}>;
  req_headers?: Array<{name: string; desc?: string; required?: string}>;
  req_body_form?: Array<{name: string; type: string; desc?: string; required?: string}>;
  title: string;
  catid: string;
  path: string;
  status?: string;
  res_body_type?: string;
  res_body?: string;
  method?: string;
  req_params?: Array<{name: string; desc?: string; example?: string}>;
  desc?: string;
}

export interface SaveInterfaceRequest extends AddInterfaceRequest {
  id: string;
}

export interface ListInterfacesRequest {
  project_id: string;
  token: string;
  page: number;
  limit: number;
}

export interface UpdateInterfaceRequest extends AddInterfaceRequest {
  id: string;
}

export interface ListMenuRequest {
  project_id: string;
  token: string;
}

// Response types
export interface YApiResponse<T = any> {
  errcode: number;
  errmsg: string;
  data: T;
}

export interface ProjectData {
  _id: number;
  name: string;
  desc: string;
  basepath: string;
  manager: string;
  member?: string[];
  [key: string]: any;
}

export interface InterfaceData {
  _id: number;
  project_id: number;
  catid: number;
  title: string;
  path: string;
  method: string;
  req_body_type: string;
  res_body: string;
  res_body_type: string;
  uid: number;
  add_time: number;
  up_time: number;
  req_body_form: Array<{name: string; type: string; example: string; desc: string; required: string}>;
  req_params: Array<{name: string; example: string; desc: string}>;
  req_headers: Array<{name: string; type: string; example: string; desc: string; required: string}>;
  req_query: Array<{name: string; type: string; example: string; desc: string; required: string}>;
  status: string;
  edit_uid: number;
  res_body_is_json_schema: boolean;
  [key: string]: any;
}

export interface InterfaceListItem {
  _id: number;
  project_id: number;
  catid: number;
  title: string;
  path: string;
  method: string;
  uid: number;
  add_time: number;
  up_time: number;
  status: string;
  edit_uid: number;
  [key: string]: any;
}

export interface CatMenuItem {
  _id: number;
  name: string;
  project_id: number;
  desc: string;
  uid: number;
  add_time: number;
  up_time: number;
  list?: InterfaceListItem[];
  [key: string]: any;
}
