/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'tiki.vn',
      'glotcms.sgp1.cdn.digitaloceanspaces.com',
      'study4.com',
      'scontent.fsgn5-10.fna.fbcdn.net',
      'drive.google.com',
      'lh3.googleusercontent.com',
      'yt3.ggpht.com',
    ],
  },
  env: {
    baseURL: 'http://localhost:4000',
  },
  async rewrites() {
    return [
      {
        source: '/api/laban-plugin',
        destination: 'https://laban.vn/stats/dictplg', 
      },
    ];
  },
};

export default nextConfig;
