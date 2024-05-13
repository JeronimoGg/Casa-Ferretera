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
        const id_promotoria: number = +numero;
        console.log(id_promotoria);
        const token = localStorage.getItem('session');
        
        router.push('/proveedor/cancel');
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