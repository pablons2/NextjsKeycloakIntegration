'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <div className="flex justify-center">
          <Image src="/img/logo.avif" width="80" height="80" alt="logo" />
        </div>
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4 text-gray-500">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => signIn('keycloak')}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Autenticar com Keycloak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
