# YAPI MCP Server

YAPI 项目接口查询 MCP 服务

## 启动服务

### Docker 方式

```bash
docker build -t yapi-mcp .
docker run -d -p 3001:3001 --name yapi-mcp yapi-mcp
```

### 直接运行

```bash
npm install
npm run build
npm run start:http
```

## IDE 配置

### Trae 配置

在 Trae 设置中添加 MCP Server：

```json
{
  "mcpServers": {
    "yapi": {
      "url": "http://服务器IP:3001",
      "headers": {
        "Authorization": "你的YAPI_TOKEN"
      }
    }
  }
}
```

### Cursor 配置

在 Cursor 设置中添加 MCP Server：

```json
{
  "mcpServers": {
    "yapi": {
      "url": "http://服务器IP:3001",
      "headers": {
        "Authorization": "你的YAPI_TOKEN"
      }
    }
  }
}
```

## 提示词

```
你是一个 YAPI 项目接口查询助手。可以通过以下 MCP 工具查询项目接口信息：
- mcp_yapi_list_interfaces: 查询项目接口列表，需要传入项目ID（project_id）
- mcp_yapi_list_collections: 查询项目分类列表，需要传入项目ID（project_id）
- mcp_yapi_get_interface: 查询接口详情，需要传入接口ID（interface_id）

使用示例：调用 mcp_yapi_list_interfaces 查询项目 591 的所有接口
```

## MCP 工具列表

| 工具名称 | 参数 | 说明 |
|---------|------|------|
| mcp_yapi_list_interfaces | project_id | 查询项目接口列表 |
| mcp_yapi_list_collections | project_id | 查询项目分类列表 |
| mcp_yapi_get_interface | interface_id | 查询接口详情 |


启动:
docker build -t yapi-mcp-server .
docker stop yapi-mcp
docker rm yapi-mcp
docker run -d --name yapi-mcp \
  -p 3001:3001 \
  -e YAPI_BASE_URL=http://yapi.dev.com \
  yapi-mcp-server
docker logs -f yapi-mcp

trae配置:
{
  "mcpServers": {
    "yapi": {
      "url": "http://127.0.0.1:3001",
      "headers": {
        "Authorization": "116a967ed3b4625af25037cae"
      }
    }
  }
}