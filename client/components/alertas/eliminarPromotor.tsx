"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import trashCan from '@/public/trash-can.svg';
import Image from 'next/image';

export function EliminarAlertaPromotor ({ numero, nombre }: { numero: string, nombre: string }) {
    const router = useRouter();
    const handleClick = async () => {
        const id: number = +numero;
        
        const token = localStorage.getItem('session');
        try {
          const response = await fetch(`/api/usuarios/borrar-promotor/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            const respuesta = await response.json();
            console.log(respuesta);
          }
          const respuesta  = await response.json();
          console.log(respuesta);
          router.back();  
        } catch (error) {
          console.log(error);
        }
        
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost"><Image src={trashCan} alt="boton borrar" width={25} height={25} /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro de eliminar a {nombre}</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede revertir
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>volver</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  
}