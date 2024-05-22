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

export function CancelarAlerta ({ numero }: { numero: string }) {
    const router = useRouter();
    const handleClick = async () => {
        const id: number = +numero;
        const token = localStorage.getItem('session');
        try {
          const response = await fetch(`/api/promotorias/cancelar-proveedor/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            const respuesta = await response.json();
            console.log(respuesta);
          }
          const { mensaje }  = await response.json();
          console.log(mensaje);
          router.push('/proveedor');  
        } catch (error) {
          console.log(error);
        }
        
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Cancelar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede revertir
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>volver</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>Cancelar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  
}