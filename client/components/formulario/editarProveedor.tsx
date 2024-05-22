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
  empresa: z.string().nonempty("Este campo es requerido")
});


interface formValues {
  nombre: string;
  correo: string;
  empresa: string;
}

export default function FormularioEditarProveedor({ initialValues, id }: { initialValues: formValues, id: number}) {
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<string | undefined>(undefined);
  const [rol, setRol] = useState<string | undefined>(undefined);
  const router = useRouter()
  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    const token = localStorage.getItem('session');
    const response = await fetch(`/api/usuarios/proveedores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
      });
    if(!response.ok){
      const respuesta = await response.json();
      if(respuesta.message && respuesta.rol){
        setError(respuesta.message);
        setRol(respuesta.rol.toLowerCase());
      } else {
        setError(respuesta.message);
      }
    } else{
      const  { mensaje }  = await response.json();
      console.log(mensaje);
    }
  }

  

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
        </form>
      </Form>
    </div>
  );
}