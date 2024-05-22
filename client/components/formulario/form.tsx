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

const formSchema = z.object({
  nombre: z.string().nonempty("Este campo es requerido"),
  sede: z.string({
    required_error: "Por favor seleccione una sede",
  }),
  date: z.date(),
  horaInicio: z.string({
    required_error: "Por favor seleccione una hora",
  }),
  horaFinal: z.string({
    required_error: "Por favor seleccione una hora",
  }),
  descripcion: z.string().nonempty("Este campo es requerido"),
});



export default function ProfileForm() {

  const today = new Date();
  const twoDaysAfter = new Date(today.setDate(today.getDate()));

  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(values));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
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
            control={FormularioProv.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha para la promotoria</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      disabled={(date) => {
                        return isWeekend(date) || date < twoDaysAfter;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Escoja la fecha en la que quiere realizar su promotoria.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
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
            control={FormularioProv.control}
            name="horaInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora Final</FormLabel>
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
            control={FormularioProv.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion Promotoria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Comentenos sobre que hara su promotoria"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Aqui escribes una descripcion de tu promotoria
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}