import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Configuración de las imagenes, se configura el protocolo y el hostname para evitar el error mencionado en ImageUpload.tsx
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
