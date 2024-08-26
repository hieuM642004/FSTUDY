/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com','tiki.vn' , 'glotcms.sgp1.cdn.digitaloceanspaces.com' , 'study4.com' ,'scontent.fsgn5-10.fna.fbcdn.net',
    'drive.google.com', 'lh3.googleusercontent.com'],
  },
  env: {
    baseURL: 'http://localhost:4000',
  },
};

export default nextConfig;
