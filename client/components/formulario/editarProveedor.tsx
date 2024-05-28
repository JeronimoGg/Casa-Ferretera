"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  nombre: z.string({
    required_error: "Este campo es requerido",
  }),
  correo: z.string().email("Este campo debe ser un email").nonempty("Este campo es requerido"),
  empresa: z.string({
    required_error: "Este campo es requerido",
  })
});


interface formValues {
  nombre: string;
  correo: string;
  empresa: string;
}

export default function FormularioEditarProveedor({ initialValues, id }: { initialValues: formValues, id: number}) {
  const [mensaje, setMensaje] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    const { nombre, correo, empresa } = values
    const token = localStorage.getItem('session');
    const response = await fetch(`/api/usuarios/proveedores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({nombre, correo, nombreEmpresa: empresa})
      });
    if(!response.ok){
      const respuesta = await response.json();
      setError(respuesta.message); 
      setMensaje(undefined);
    } else{
      const  { mensaje }  = await response.json();
      console.log(mensaje);
      setMensaje(mensaje);
      setError(undefined);
    }
  }



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
                Actualice el nombre completo del proveedor
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
                  Actualice el correo electronico del proveedor
                </FormDescription> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduzca la empresa del proveedor"
                      {...field}
                    />
                  </FormControl> 
                  <FormDescription>
                  Actualice la empresa del proveedor
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
            <Button variant="outline">
              <Link href={`/auxiliar-de-mercadeo/usuarios/proveedores`}>
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