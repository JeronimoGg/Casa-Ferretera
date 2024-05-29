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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  nombre: z.string().nonempty("Este campo es requerido"),
  correo: z.string().email("Este campo debe ser un email").nonempty("Este campo es requerido"),
  calificacion: z.coerce.number().positive().min(1).max(5)
});


interface formValues {
  nombre: string;
  correo: string;
  calificacion: number;
}

export default function ProfileForm({ initialValues, id }: { initialValues: formValues, id: number}) {
  const router = useRouter()
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    const token = localStorage.getItem('session');
    const response = await fetch(`/api/usuarios/promotores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
      });
    if(!response.ok){
      const respuesta = await response.json();
      setError(respuesta.message); 
      setMensaje(undefined);
    } else {
      const  { mensaje }  = await response.json();
      console.log(mensaje);
      setMensaje(mensaje);
      setError(undefined);
    }
  }

  const handleVolver = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24 pt-10">
      <Form {...FormularioProv}>
        <form
          onSubmit={FormularioProv.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={FormularioProv.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Promotor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca el nombre completo del promotor"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Escribe el nombre completo del promotor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electronico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduzca el correo electronico del promotor"
                      {...field}
                    />
                  </FormControl> 
                  <FormDescription>
                  Escribe el correo electronico del promotor
                </FormDescription> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="calificacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calificacion</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Introduzca el correo electronico del promotor"
                      {...field}
                    />
                  </FormControl> 
                  <FormDescription>
                  Actualice la calificacion del promotor
                </FormDescription> 
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Actualizar
          </Button>
          {mensaje && 
          <div className="text-center mt-4">
            <p className="text-green-500 text-lg">{mensaje}</p>
            <Button variant="outline" onClick={handleVolver}>
              Volver
            </Button>
          </div>
          }
        </form>
      </Form>
    </div>
  );
}