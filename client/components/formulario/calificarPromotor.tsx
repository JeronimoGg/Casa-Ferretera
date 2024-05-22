"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, isWeekend } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

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
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    nombre: z.string({
        required_error: "Este campo es requerido",
    }),
    calificacion: z.coerce.number({
        required_error: "por favor ponga una nota",
    }),
    comentario: z.string({
        required_error: "Este campo es requerido",
        })
        .min(10, {
            message: "El comentario debe tener al menos 10 caracteres"
        })
        .max(100, {
          message: "La descripción no puede tener más de 100 caracteres"
        })
        .optional()
})

export default function CalificarPromotorForm({ nombres } : { nombres: Array<string> }) {
    const [mensaje, setMensaje] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        let { nombre, calificacion, comentario } = data;
        if(comentario === undefined) {
            comentario = '';
        }
        const token = localStorage.getItem('session');
        try {
            const response = await fetch('/api/promotorias/calificar-promotor', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nombrePromotor: nombre, calificacion, comentario})
            });
            if(!response.ok){
                const respuesta = await response.json();
                console.log(respuesta.error);
                return;
            }  
            const { message } = await response.json();
            setMensaje(message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-2/3 flex flex-col gap-4">
                    <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seleccion el promotor</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona algun promotor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nombres.map((nombre, index) => (
                              <SelectItem key={index} value={nombre}>{nombre}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="calificacion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nota del promotor</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccione la calificacion" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="comentario"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comentarios adicionales del promotor</FormLabel>
                            <FormControl>
                            <Textarea
                              placeholder="Escriba sus comentarios"
                              className="resize-none"
                              {...field}
                            />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Calificar</Button>
                    {mensaje && 
                    <div className="text-center mt-4">
                      <p className="text-green-500 text-lg">{mensaje}</p>
                      <Button variant="outline">
                        <Link href={`/supervisor`}>
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