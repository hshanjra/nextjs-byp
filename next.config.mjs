/** @type {import('next').NextConfig} */
const nextConfig = {
     experimental: {
    urlImports: ['http://api.zippopotam.us', 'https://r.stripe.com'],
  },
    images:{
        remotePatterns:[
            {
                hostname: 'res.cloudinary.com',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
