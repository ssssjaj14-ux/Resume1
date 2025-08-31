import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    plugins: [
      react({
        // Enable fast refresh for better development experience
        fastRefresh: true,
        // Include JSX runtime for better performance
        jsxRuntime: 'automatic'
      })
    ],
    server: {
      port: 3000,
      host: true, // Listen on all network interfaces
      strictPort: false,
      open: false, // Don't auto-open browser
      cors: true,
      // Enable HMR for better development experience
      hmr: {
        overlay: true
      }
    },
    preview: {
      port: 3000,
      host: true,
      strictPort: false,
      cors: true
    },
    // Optimize dependencies for faster builds
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'framer-motion',
        'lucide-react',
        'jspdf',
        'react-hook-form',
        'react-hot-toast',
        'file-saver'
      ],
      exclude: ['@vite/client', '@vite/env']
    },
    build: {
      // Optimize for production deployment
      target: 'es2020',
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
      minify: 'terser',
      cssMinify: true,
      
      // Optimize bundle splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['framer-motion', 'lucide-react'],
            'utils-vendor': ['jspdf', 'file-saver']
          },
          // Optimize asset naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      
      // Terser options for better compression
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      },
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      
      // Asset inlining threshold
      assetsInlineLimit: 4096
    },
    
    // Define global constants
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      '__DEV__': mode === 'development'
    },
    
    // CSS configuration
    css: {
      devSourcemap: mode === 'development',
      postcss: {
        plugins: []
      }
    },
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    
    // ESBuild configuration for faster builds
    esbuild: {
      target: 'es2020',
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    
    // Worker configuration
    worker: {
      format: 'es'
    }
  };
});