import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do workspace neste projeto — evita que o Next infira a home
  // do usuário como raiz por causa de um package-lock.json existente lá.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
