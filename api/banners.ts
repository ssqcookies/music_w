// import { createGetHandler } from './_lib/utils';

// export default createGetHandler({
//   dataPath: 'public/data/banners.json',
// });

/**
 只允许 GET 请求
使用同步文件读取（适合小文件、单次读取）
完全禁止缓存
处理了文件不存在和其他异常情况
部署到 Vercel 后，可通过 /api/banners 访问
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
/**
 * 含义：从 @vercel/node 包中导入 TypeScript 类型 VercelRequest 和 VercelResponse。
作用：为 req（请求对象）和 res（响应对象）提供类型定义，以便在 TypeScript 中获得代码提示和类型检查。这些类型描述了 Vercel 运行时环境中请求/响应对象的具体属性和方法。
 */
import fs from 'fs';
import path from 'path';
/**
 含义：导入 Node.js 内置的 fs（文件系统）模块。
作用：用于读取服务器上的文件，例如读取 JSON 数据文件。
含义：导入 Node.js 内置的 path 模块。
作用：用于处理和拼接文件路径，保证跨平台兼容性（如 Windows 和 Linux 的路径分隔符不同）。
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  /**
   含义：默认导出一个名为 handler 的函数，它是 Vercel Serverless Function 的入口点。

作用：当请求到达 /api/banners 时，Vercel 会调用这个函数，并传入请求对象 req 和响应对象 res。
   */
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    // 注意：路径中包含 public 文件夹
    const dataPath = path.join(process.cwd(), 'public', 'data', 'banners.json');
    /**
     含义：使用 path.join() 方法将多个路径片段拼接成一个完整的文件路径。
     process.cwd() 返回当前工作目录（在 Vercel 环境中是项目根目录）。
     然后依次拼接 public、data、banners.json。
     作用：构建要读取的 JSON 文件的绝对路径，确保无论部署环境如何都能正确找到文件（假设文件放在 public/data/banners.json 下）。
     */
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(jsonData);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('读取数据失败:', error);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Banners data file not found' });
    } else {
      res.status(500).json({
        error: 'Failed to load data',
        details: error.message,
      });
    }
  }
}