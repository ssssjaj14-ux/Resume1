import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Use environment variable for port or default to 3000
  const port = parseInt(env.PORT || '3000');
  
  return {
    base: '/',
    plugins: [react()],
    server: {
      port: port,
      host: true, // Listen on all network interfaces
      strictPort: false,
      open: true, // Open browser on server start
    },
    preview: {
      port: port,
      host: true,
      strictPort: false,
    },
    optimizeDeps: {
      include: ['lucide-react', 'jspdf'],
      exclude: [],
    },
    build: {
      rollupOptions: {
        external: [],
      },
      commonjsOptions: {
        include: [/node_modules/],
      },
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      'process.env': {}
    }
  };
});
