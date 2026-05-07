import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { YApiClient } from './yapi-client.js';

const YAPI_BASE_URL = process.env.YAPI_BASE_URL || 'http://localhost:3000';
const PORT = parseInt(process.env.PORT || '3001');

const yapiClient = new YApiClient(YAPI_BASE_URL);

interface Tool {
  name: string;
  description: string;
  inputSchema: any;
  handler: (args: any) => Promise<any>;
}

const tools: Record<string, Tool> = {
  get_project: {
    name: 'get_project',
    description: '获取项目基本信息',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' }
      },
      required: ['token']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.getProject({ token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  add_cat: {
    name: 'add_cat',
    description: '新增接口分类',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        name: { type: 'string', description: '分类名称' },
        desc: { type: 'string', description: '分类描述' },
        project_id: { type: 'string', description: '项目ID' }
      },
      required: ['token', 'name', 'project_id']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.addCat({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  get_cat_menu: {
    name: 'get_cat_menu',
    description: '获取菜单列表',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: '项目ID' },
        token: { type: 'string', description: '项目token' }
      },
      required: ['project_id', 'token']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.getCatMenu({ project_id: args.project_id, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  import_data: {
    name: 'import_data',
    description: '服务端数据导入',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        type: { type: 'string', enum: ['swagger', 'postman', 'har'], description: '导入方式' },
        json: { type: 'string', description: 'JSON数据' },
        merge: { type: 'string', enum: ['normal', 'good', 'merge'], description: '数据同步方式' },
        url: { type: 'string', description: '导入数据URL' }
      },
      required: ['token', 'type', 'merge']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.importData({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  get_interface: {
    name: 'get_interface',
    description: '获取接口数据',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '接口ID' },
        token: { type: 'string', description: '项目token' }
      },
      required: ['id', 'token']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.getInterface({ id: args.id, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  list_cat: {
    name: 'list_cat',
    description: '获取分类下接口列表',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        catid: { type: 'string', description: '分类ID' },
        page: { type: 'number', description: '当前页面' },
        limit: { type: 'number', description: '每页数量' }
      },
      required: ['token', 'catid']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.listCat({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  add_interface: {
    name: 'add_interface',
    description: '新增接口',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        title: { type: 'string', description: '接口名称' },
        path: { type: 'string', description: '请求路径' },
        method: { type: 'string', description: '请求方法' },
        catid: { type: 'string', description: '分类ID' },
        desc: { type: 'string', description: '接口描述' },
        status: { type: 'string', description: '接口状态' },
        req_query: { type: 'array', description: 'Query参数' },
        req_headers: { type: 'array', description: '请求头' },
        req_body_form: { type: 'array', description: '表单参数' },
        req_params: { type: 'array', description: '路径参数' },
        req_body_type: { type: 'string', description: '请求数据类型' },
        res_body_type: { type: 'string', description: '返回数据类型' },
        res_body: { type: 'string', description: '返回数据' }
      },
      required: ['token', 'title', 'path', 'catid']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.addInterface({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  save_interface: {
    name: 'save_interface',
    description: '新增或更新接口',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        id: { type: 'string', description: '接口ID' },
        title: { type: 'string', description: '接口名称' },
        path: { type: 'string', description: '请求路径' },
        method: { type: 'string', description: '请求方法' },
        catid: { type: 'string', description: '分类ID' },
        desc: { type: 'string', description: '接口描述' },
        status: { type: 'string', description: '接口状态' },
        req_query: { type: 'array', description: 'Query参数' },
        req_headers: { type: 'array', description: '请求头' },
        req_body_form: { type: 'array', description: '表单参数' },
        req_params: { type: 'array', description: '路径参数' },
        req_body_type: { type: 'string', description: '请求数据类型' },
        res_body_type: { type: 'string', description: '返回数据类型' },
        res_body: { type: 'string', description: '返回数据' }
      },
      required: ['token', 'title', 'path', 'catid']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.saveInterface({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  list_interfaces: {
    name: 'list_interfaces',
    description: '获取接口列表',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: '项目ID' },
        token: { type: 'string', description: '项目token' },
        page: { type: 'number', description: '当前页数' },
        limit: { type: 'number', description: '每页数量' }
      },
      required: ['project_id', 'token', 'page', 'limit']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.listInterfaces({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  update_interface: {
    name: 'update_interface',
    description: '更新接口',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: '项目token' },
        id: { type: 'string', description: '接口ID' },
        title: { type: 'string', description: '接口名称' },
        path: { type: 'string', description: '请求路径' },
        method: { type: 'string', description: '请求方法' },
        catid: { type: 'string', description: '分类ID' },
        desc: { type: 'string', description: '接口描述' },
        status: { type: 'string', description: '接口状态' },
        req_query: { type: 'array', description: 'Query参数' },
        req_headers: { type: 'array', description: '请求头' },
        req_body_form: { type: 'array', description: '表单参数' },
        req_params: { type: 'array', description: '路径参数' },
        req_body_type: { type: 'string', description: '请求数据类型' },
        res_body_type: { type: 'string', description: '返回数据类型' },
        res_body: { type: 'string', description: '返回数据' }
      },
      required: ['token', 'id', 'title', 'path', 'catid']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.updateInterface({ ...args, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  },
  list_menu: {
    name: 'list_menu',
    description: '获取接口菜单',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: '项目ID' },
        token: { type: 'string', description: '项目token' }
      },
      required: ['project_id', 'token']
    },
    handler: async (args: any) => {
      const token = args.token || '';
      if (!token) {
        return { content: [{ type: 'text', text: 'Error: token is required' }], isError: true };
      }
      const result = await yapiClient.listMenu({ project_id: args.project_id, token });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  }
};

const sessions = new Map<string, { initialized: boolean }>();

function sendJson(res: any, data: any, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'MCP-Protocol-Version': '2024-11-05'
  });
  res.end(JSON.stringify(data));
}

function sendSSE(res: any, data: string) {
  res.write(`data: ${data}\n\n`);
}

const server = createServer((req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string;
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader?.replace(/^Bearer\s+/i, '') || '';

  console.log(`${new Date().toISOString()} ${req.method} ${req.url} session=${sessionId}`);

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        const responseSessionId = sessionId || randomUUID();

        if (!sessions.has(responseSessionId)) {
          sessions.set(responseSessionId, { initialized: false });
        }

        let response: any;

        if (request.method === 'initialize') {
          response = {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: { tools: {} },
              serverInfo: { name: 'yapi-mcp-server', version: '1.0.0' }
            }
          };
        } else if (request.method === 'tools/list') {
          response = {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              tools: Object.values(tools).map(tool => ({
                name: tool.name,
                description: tool.description,
                inputSchema: tool.inputSchema
              }))
            }
          };
        } else if (request.method === 'tools/call') {
          const tool = tools[request.params?.name];
          if (!tool) {
            response = {
              jsonrpc: '2.0',
              id: request.id,
              error: { code: -32601, message: `Tool ${request.params?.name} not found` }
            };
          } else {
            const args = { ...request.params?.arguments, token };
            const result = await tool.handler(args);
            response = {
              jsonrpc: '2.0',
              id: request.id,
              result: result
            };
          }
        } else if (request.method === 'notifications/initialized') {
          response = null;
        } else {
          response = {
            jsonrpc: '2.0',
            id: request.id,
            error: { code: -32601, message: 'Method not found' }
          };
        }

        if (response) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'MCP-Session-Id': responseSessionId,
            'Access-Control-Expose-Headers': 'MCP-Session-Id'
          });
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(204);
          res.end();
        }
      } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { code: -32700, message: error.message } }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`YApi MCP Server running on http://0.0.0.0:${PORT}`);
});