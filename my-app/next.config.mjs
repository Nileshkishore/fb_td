/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode for better error handling and highlighting potential issues
    
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/api/metrics',
            destination: 'http://frontend:3000/api/metrics',
          },
        ];
      },
    
    // Custom Webpack configuration
    webpack: (config, { isServer }) => {
      // Example of adding custom loaders or plugins
      if (!isServer) {
        // Client-side only configuration
        config.resolve.fallback = { fs: false };
      }
      
      // Example of custom plugin addition
      // config.plugins.push(new MyCustomWebpackPlugin());
  
      // Modify or extend the existing configuration as needed
      return config;
    },
  
    // Custom environment variables
    env: {
      CUSTOM_API_URL: process.env.CUSTOM_API_URL || 'http://localhost:3000/api',
    },
  
    // Configure Webpack to use specific features
    images: {
      domains: ['example.com'], // Add external domains to allow image optimization
    },
  
    // React refresh and experimental features
    experimental: {
      // Enable experimental features
      reactRoot: true, // For React 18
      // More experimental features can be added here
    },
  
    // Configurations related to static files and asset handling
    staticPageGenerationTimeout: 60, // Increase timeout for static page generation
    trailingSlash: true, // Add trailing slashes to routes
  
    // Additional configurations if needed
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/api/:path*',
        },
      ];
    },
    
    // HTTP security headers
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  