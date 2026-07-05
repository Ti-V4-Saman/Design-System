import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do workspace neste projeto — evita que o Next infira a home
  // do usuário como raiz por causa de um package-lock.json existente lá.
  turbopack: {
    root: __dirname,
  },
  // Dev-only: permite acessar o dev server via 127.0.0.1 sem que o Next 16
  // bloqueie os recursos internos (_next/*) como cross-origin. Sem efeito em
  // produção.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
