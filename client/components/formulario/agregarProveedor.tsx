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
    correo: z.string().email("Este campo debe ser un email").nonempty("Este campo es requerido"),
    nombre: z.string().nonempty("Este campo es requerido"),
    nombreEmpresa: z.string().refine(value => !/\s/.test(value), {
        message: "El campo no puede contener espacios.",
      }),
    contrasena: z.string(),
});


export default function SignUpProveedor() {
  const router = useRouter()
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    const { nombre, correo, contrasena, nombreEmpresa } = values;
    const token = localStorage.getItem('session');
    try {
        const response = await fetch('/api/usuarios/crear-proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({nombre, correo, contrasena, nombreEmpresa})
        });
        if(!response.ok){
            const respuesta  = await response.json();
            setError(respuesta.error);
            setMensaje(undefined);
            return
        }
        const { respuesta }  = await response.json();
            setMensaje(respuesta.message);
            setError(undefined);
    } catch (error) {
        console.log(error);
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
            {error && 
            <p className="text-red-500 text-lg mt-4 text-center">
            {error}
            </p>}
          <FormField
            control={FormularioProv.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del proveedor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca el nombre completo del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Escribe el nombre completo del proveedor
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
                      placeholder="Introduzca el correo electronico del proveedor"
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
            name="nombreEmpresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduzca la empresa del proveedor"
                      {...field}
                    />
                  </FormControl> 
                  <FormDescription>
                  Escribe el nombre de la empresa
                </FormDescription> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="contrasena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduzca la contraseña del proveedor"
                      {...field}
                      type="password"
                    />
                  </FormControl> 
                  <FormDescription>
                  Escribe la contraseña del proveedor
                </FormDescription> 
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Crear
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