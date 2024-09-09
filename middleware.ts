import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/api/auth/*']; // Rotas públicas que não requerem autenticação

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Verifica se a rota acessada está na lista de rotas públicas
  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next(); // Permite o acesso a rotas públicas
  }

  // Verifica a sessão do usuário
  const session = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  }).then((res) => res.json());

  // Se não estiver autenticado, redireciona para a rota pública
  if (!session?.user) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define quais caminhos o middleware deve aplicar
export const config = {
  matcher: ['/painel/:path*', '/api/:path*'], // Rotas protegidas e da API
};
