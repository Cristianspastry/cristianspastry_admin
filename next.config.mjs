/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
         {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          
        },
        ],
      },
};
/*
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/cristian-s-pastry-86a80.appspot.com/o/**',
        },*/
export default nextConfig;
