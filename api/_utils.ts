// api/_utils.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

/**
 * 通用配置选项
 */
interface HandlerOptions {
  /** 数据文件相对于项目根目录的路径，例如 'public/data/banners.json' */
  dataPath: string;
  /** 是否支持分页 (默认 false) */
  pagination?: boolean;
  /** 默认每页数量 (仅当 pagination = true 时生效) */
  defaultLimit?: number;
}

/**
 * 创建一个标准的 GET 请求处理器
 * @param options 配置项
 * @returns 一个会读取 JSON 并返回数据的 handler 函数
 */
export function createGetHandler(options: HandlerOptions) {
  const { dataPath, pagination = false, defaultLimit = 10 } = options;

  return async (req: VercelRequest, res: VercelResponse) => {
    // 仅允许 GET 方法
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
      const fullPath = path.join(process.cwd(), dataPath);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      let data = JSON.parse(fileContent);
      // 分页处理
      if (pagination && Array.isArray(data)) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || defaultLimit;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = data.slice(start, end);
        const total = data.length;
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

        return res.status(200).json({
          data: paginatedData,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        });
      }

      // 无分页：直接返回全部数据
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.status(200).json(data);
    } catch (error: any) {
      console.error(`读取数据失败 [${dataPath}]:`, error);
      if (error.code === 'ENOENT') {
        res.status(404).json({ error: 'Data file not found' });
      } else {
        res.status(500).json({ error: 'Failed to load data', details: error.message });
      }
    }
  };
}