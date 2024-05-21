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
import { useRouter } from "next/navigation";

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
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    nombre: z.string({
        required_error: "Este campo es requerido",
    }),
    sede: z.string({
        required_error: "Por favor seleccione una sede",
      }),
    date: z.date({
        required_error: "Seleccione una fecha",
      }),
      horaInicio: z.string({
        required_error: "Por favor seleccione una hora",
      }),
      horaFin: z.string({
        required_error: "Por favor seleccione una hora",
      }),
  });



export default function FormularioAgendar({ nombres } : { nombres: Array<string> }) {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>(undefined);
    const today = new Date();
    const twoDaysAfter = new Date(today.setDate(today.getDate()));
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
   
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { nombre, date, sede, horaInicio, horaFin } = data;
        const token = localStorage.getItem('session');
        const fechaPromotoria = new Date(date);
        const fecha = fechaPromotoria.toISOString().split('T')[0];
        console.log(nombre, fecha, sede, horaInicio, horaFin);
        try {
          const response = await fetch('/api/promotorias/agendar-proveedor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombrePromotor: nombre, fecha, nombreSede: sede, horaInicio, horaFinal: horaFin })
            });
          if(!response.ok){
            const respuesta = await response.json();
            setError(respuesta.error);
            return;
          }  
          const { message } = await response.json();
          console.log(message);
          router.push('/proveedor');  
        } catch (error) {
          
          console.log(error);
        }
        
    }
   
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && 
        <p className="text-red-500 text-lg mt-4 text-center">
        {error}
        </p>}
        <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotores disponibles</FormLabel>
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
                name="sede"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sedes disponibles</FormLabel>
                    <Select onValueChange={field.onChange}>
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha promotoria</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>{
                        return isWeekend(date) || date < twoDaysAfter;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  La fecha en la que desea realizar la promotoria
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="horaInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora Inicio</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una hora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="07:00:00">7:00 a.m</SelectItem>
                    <SelectItem value="08:00:00">8:00 a.m</SelectItem>
                    <SelectItem value="09:00:00">9:00 a.m</SelectItem>
                    <SelectItem value="10:00:00">10:00 a.m</SelectItem>
                    <SelectItem value="11:00:00">11:00 a.m</SelectItem>
                    <SelectItem value="12:00:00">12:00 a.m</SelectItem>
                    <SelectItem value="13:00:00">1:00 pm</SelectItem>
                    <SelectItem value="14:00:00">2:00 pm</SelectItem>
                    <SelectItem value="15:00:00">3:00 pm</SelectItem>
                    <SelectItem value="16:00:00">4:00 pm</SelectItem>
                    <SelectItem value="17:00:00">5:00 pm</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="horaFin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora Inicio</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una hora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="07:00:00">7:00 a.m</SelectItem>
                    <SelectItem value="08:00:00">8:00 a.m</SelectItem>
                    <SelectItem value="09:00:00">9:00 a.m</SelectItem>
                    <SelectItem value="10:00:00">10:00 a.m</SelectItem>
                    <SelectItem value="11:00:00">11:00 a.m</SelectItem>
                    <SelectItem value="12:00:00">12:00 a.m</SelectItem>
                    <SelectItem value="13:00:00">1:00 pm</SelectItem>
                    <SelectItem value="14:00:00">2:00 pm</SelectItem>
                    <SelectItem value="15:00:00">3:00 pm</SelectItem>
                    <SelectItem value="16:00:00">4:00 pm</SelectItem>
                    <SelectItem value="17:00:00">5:00 pm</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Agendar</Button>
        </form>
      </Form>
      </div>
    )
  }