// api/banners.js
import fs from 'fs';
import path from 'path';

// process.cwd() 指向 Vercel 构建环境中的项目根目录
const dataPath = path.join(process.cwd(), 'DataJSON', 'banners.json');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(jsonData);

    // 设置缓存头（可选，优化性能）
    res.setHeader('Cache-Control', 's-maxage=3600'); // 缓存 1 小时

    res.status(200).json(parsedData);
  } catch (error) {
    console.error('读取轮播图数据失败:', error);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Banners data file not found' });
    } else {
      res.status(500).json({ error: 'Failed to load data', details: error.message });
    }
  }
}