import { Plugin } from 'vite';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiResolver } from 'next/dist/server/api-utils/node';
import path from 'path';
import fs from 'fs';

export default function vitePluginApi(): Plugin {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      // Find all API routes
      const apiDir = path.join(process.cwd(), 'src/pages/api');
      const apiRoutes = new Map<string, any>();

      const loadApiRoutes = () => {
        if (fs.existsSync(apiDir)) {
          fs.readdirSync(apiDir).forEach(file => {
            if (file.endsWith('.ts') || file.endsWith('.js')) {
              const route = `/${file.replace(/\.(ts|js)$/, '')}`;
              try {
                const handler = require(path.join(apiDir, file)).default;
                if (typeof handler === 'function') {
                  apiRoutes.set(route, handler);
                }
              } catch (error) {
                console.error(`Error loading API route ${file}:`, error);
              }
            }
          });
        }
      };

      // Load API routes initially
      loadApiRoutes();

      // Watch for changes to API routes
      if (process.env.NODE_ENV !== 'production') {
        fs.watch(apiDir, (eventType, filename) => {
          if (filename) {
            console.log(`API route ${filename} changed, reloading...`);
            delete require.cache[require.resolve(path.join(apiDir, filename))];
            loadApiRoutes();
          }
        });
      }

      // Create a middleware to handle API requests
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/')) {
            return next();
          }

          const parsedUrl = parse(req.url, true);
          const route = parsedUrl.pathname?.replace(/^\/api/, '') || '/';
          const handler = apiRoutes.get(route);

          if (!handler) {
            res.statusCode = 404;
            return res.end('Not Found');
          }

          // Convert Vite's request to Next.js API request
          const nextReq = req as unknown as NextApiRequest;
          const nextRes = res as unknown as NextApiResponse;

          // Set up response methods
          nextRes.status = (code: number) => {
            res.statusCode = code;
            return nextRes;
          };

          nextRes.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return nextRes;
          };

          nextRes.send = (data: any) => {
            if (typeof data === 'object') {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } else {
              res.end(data);
            }
            return nextRes;
          };

          // Handle the API request
          try {
            await handler(nextReq, nextRes);
          } catch (error) {
            console.error('API Error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ 
              error: 'Internal Server Error',
              message: error instanceof Error ? error.message : 'Unknown error'
            }));
          }
        });
      };
    }
  };
}
