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
    const  { mensaje }  = await response.json();
    console.log(mensaje);

    router.push('/auxiliar-de-mercadeo/usuarios/promotores')
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
        </form>
      </Form>
    </div>
  );
}