'use client'


import '@/style/globals.css'
import { useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <html lang="en">
      
      <body
    
      >
         <div className="flex h-screen">
      {/* Menu Lateral */}
      <aside className={`bg-gray-800 text-white w-64 p-6 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <h1 className="text-2xl font-bold mb-6">Menu</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Configurações</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Perfil</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-gray-200 p-4 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Página Autenticada</h2>
            <button
              className="md:hidden bg-gray-800 text-white p-2 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? 'Fechar Menu' : 'Abrir Menu'}
            </button>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Área em branco para futuras implementações */}
          {children}
        </main>
      </div>
    </div>
      </body>
    </html>
  );
}
