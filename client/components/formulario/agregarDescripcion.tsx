"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";

const formSchema = z.object({
  descripcion: z.string({
    required_error: "Este campo es requerido",
    })
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres"
    })
    .max(200, {
      message: "La descripción no puede tener más de 200 caracteres"
    })
  
});




export default function FormularioDescripcion({ id }: { id: number}) {
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [rol, setRol] = useState<string | undefined>(undefined);
  const router = useRouter()
  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    try {
      const { descripcion } = values;
      const token = localStorage.getItem('session');
      const response = await fetch(`/api/promotorias/agregar-descripcion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({descripcion})
        });  
        if(!response.ok){
          const respuesta = await response.json();
          if(respuesta.message && respuesta.rol){
            setError(respuesta.message);
            setRol(respuesta.rol.toLowerCase());
          } else {
            setError(respuesta);
            setMensaje(undefined);
          }
        } else {
          const  { respuesta }  = await response.json();
          setMensaje(respuesta.message);
          setError(undefined);
        }
        
    } catch (error) {
      console.log(error);
    }
  }

  if (error && rol) {
    return(      
      <div className="flex flex-col items-center justify-center mt-80">
          <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-200">Error</h1>
          <p className="text-gray-700 text-xl dark:text-gray-200 pb-12 pt-6">{error}</p>
          {rol === 'auxmercadeo' ? (
            <Button>
              <Link href={`/auxiliar-de-mercadeo`}>
                Volver al portal {rol}
              </Link>
            </Button>
              ) : 
            <Button>
              <Link href={`/${rol}`}>
                  {`Volver al portal ${rol}`}
              </Link>
            </Button>
          }
      </div>     
    )
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 pt-10">
      <Form {...FormularioProv}>
        <form
          onSubmit={FormularioProv.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={FormularioProv.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion de la promotoria</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Escriba la descripcion"
                  className="resize-none"
                  {...field}
                />
                </FormControl>
                <FormDescription>
                  Describa la promotoria
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Actualizar
          </Button>
          {error && 
          <p className="text-red-500 text-lg mt-4 text-center">{error}</p>
          }
          {mensaje && 
          <div className="text-center mt-4">
            <p className="text-green-500 text-lg">{mensaje}</p>
            <Button variant="outline">
              <Link href={`/promotor/descripcion`}>
                  Volver
              </Link>
            </Button>
          </div>
          }
        </form>
      </Form>
    </div>
  );
}