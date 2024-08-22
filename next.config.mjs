/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
           
            {
                hostname: '**.googleusercontent.com',
                // pathname: '**',
                
            },
        
          ]
    }
};

export default nextConfig;
