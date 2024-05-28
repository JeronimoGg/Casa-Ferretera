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

export function RechazarAlerta ({ numero }: { numero: string }) {
    const router = useRouter();
    const handleClick = async () => {
        const id: number = +numero;
        const token = localStorage.getItem('session');
        try {
            const response = await fetch(`/api/promotorias/rechazar-supervisor/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const respuesta = await response.json();
                console.log(respuesta);
                return;
            }
            const { mensaje }  = await response.json();
            console.log(mensaje);
            router.push('/supervisor');
        } catch (error) {
            
        }
    }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Rechazar</Button>
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
            <AlertDialogAction onClick={handleClick}>Rechazar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  
}