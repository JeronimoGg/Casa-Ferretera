"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent,
  } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  nombre: z.string({
    required_error: "Este campo es requerido",
  }),
  correo: z.string().email("Este campo debe ser un email"),
  sede: z.string({
    required_error: "Este campo es requerido",
  })
});

interface formValues {
    nombre: string;
    correo: string;
    sede: string;
}

export default function FormularioEditarSupervisor({ initialValues, id }: { initialValues: formValues, id: number}) {
    const [mensaje, setMensaje] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const FormularioProv = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    async function onSubmit(values: z.infer<typeof formSchema>){
        const { nombre, correo, sede } = values;
        const token = localStorage.getItem('session');
        const response = await fetch(`/api/usuarios/supervisores/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({nombre, correo, nombreSede: sede})
        });
        if(!response.ok){
            const respuesta = await response.json();
            setError(respuesta.error);
            setMensaje(undefined);
        } else {
            const { mensaje } = await response.json();
            console.log(mensaje);
            setMensaje(mensaje);
            setError(undefined);
        }
    }

    return(
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
                  <FormLabel>Nombre del supervisor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduzca el nombre completo del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                  Actualice el nombre completo del supervisor
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
                    Actualice el correo electronico del supervisor
                  </FormDescription> 
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={FormularioProv.control}
              name="sede"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sedes</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={initialValues.sede}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona alguna sede" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="amador">Amador</SelectItem>
                        <SelectItem value="america">America</SelectItem>
                        <SelectItem value="palace">Palace</SelectItem>
                        <SelectItem value="centro">Centro</SelectItem>
                        <SelectItem value="itagui">Itagui</SelectItem>
                        <SelectItem value="envigado">Envigado</SelectItem>
                        <SelectItem value="rionegro">Rionegro</SelectItem>
                        <SelectItem value="la ceja">La Ceja</SelectItem>
                        <SelectItem value="apartado">Apartado</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Link href={`/auxiliar-de-mercadeo/usuarios/supervisores`}>
                    Volver
                </Link>
              </Button>
            </div>
            }
          </form>
        </Form>
      </div>  
    )
}