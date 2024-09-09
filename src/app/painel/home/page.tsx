
import React from "react"
import { getSession } from '@auth0/nextjs-auth0';
export default async function HomePage (){
    const { user } = await getSession();
    return (
        <span className="text-black">OLÁ!   <h2>{user?.name}</h2></span>
    )
}