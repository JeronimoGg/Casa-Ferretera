"use client";
import { useEffect } from "react";
import LayoutProfile from "./layout";
import { useRouter } from 'next/navigation'


const LandingPage = () => {
    const router = useRouter();
    const redirectProfile = async () => {
        const token = localStorage.getItem('session');
        if (!token) {
            router.push('/login');
        } 
        const response = await fetch('/api/usuarios/info',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        if(!response.ok){
            const { error } = await response.json();
            router.push('/login');
            return;
        }
        const {message}  = await response.json();
        if(message === "AuxMercadeo"){
            router.push('/auxiliar-de-mercadeo');
        } else {
            let rol = message.toLowerCase();
            router.push(`/${rol}`);
        }
    }
    useEffect(() => {
        redirectProfile();
    }, []);
    return (
        <LayoutProfile titulo="Inicio">
            <>
            
            </>
        </LayoutProfile>
    )
}

export default LandingPage;