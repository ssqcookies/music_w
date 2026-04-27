// import { createGetHandler } from './_lib/utils';

// export default createGetHandler({
//   dataPath: 'public/data/newAlbum.json',
// });


import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'newAlbum.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(jsonData);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('读取数据失败:', error);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'newAlbum data file not found' });
    } else {
      res.status(500).json({
        error: 'Failed to load data',
        details: error.message,
      });
    }
  }
}