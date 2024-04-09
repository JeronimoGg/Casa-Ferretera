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
  enterprise: z.string().nonempty("Este campo es requerido"),
  nombre: z.string().nonempty("Este campo es requerido"),
  documento: z.number().min(10, "Este campo debe tener al menos 10 caracteres"),
  email: z
    .string()
    .email("Este campo debe ser un email")
    .nonempty("Este campo es requerido"),
  sede: z.enum(["asd", "bsd", "csd", "fsx"]),
  date: z.date(),
  hora: z.enum([
    "7:00 a.m. - 8:00 a.m.",
    "8:00 a.m. - 9:00 a.m.",
    "9:00 a.m. - 10:00 a.m.",
    "10:00 a.m. - 11:00 a.m.",
    "11:00 a.m. - 12:00 p.m.",
    "12:00 p.m. - 1:00 p.m.",
    "1:00 p.m. - 2:00 p.m.",
    "2:00 p.m. - 3:00 p.m.",
    "3:00 p.m. - 4:00 p.m.",
    "4:00 p.m. - 5:00 p.m.",
    "5:00 p.m. - 6:00 p.m.",
    "6:00 p.m. - 7:00 p.m.",
    "7:00 p.m. - 8:00 p.m.",
    "8:00 p.m. - 9:00 p.m.",
  ]),
  descripcion: z.string().nonempty("Este campo es requerido"),
});

export default function ProfileForm() {
  const onSubmit = () => {};

  const today = new Date();
  const twoDaysAfter = new Date(today.setDate(today.getDate() + 2));

  const FormularioProv = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enterprise: "",
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...FormularioProv}>
        <form
          onSubmit={FormularioProv.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={FormularioProv.control}
            name="enterprise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Inserta el nombre de tu empresa"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Esta es tu empresa o nombre de tu negocio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Promotor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Itroduzca el nombre completo"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Aqui escribes tu nombre completo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de Identidad</FormLabel>
                <FormControl>
                  <Input placeholder="C.C." {...field} />
                </FormControl>
                <FormDescription>
                  Este es tu documento de identidad
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca una direccion de correo electronico valido"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Esta es tu empresa o nombre de tu negocio.
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona alguna sede" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="asd">Asd</SelectItem>
                    <SelectItem value="bsd">Bsd</SelectItem>
                    <SelectItem value="csd">Csd</SelectItem>
                    <SelectItem value="fsx">Fsx</SelectItem>
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
                <FormLabel>Date of birth</FormLabel>
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
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={FormularioProv.control}
            name="hora"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="8:00 a.m. - 10:00a.m." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="7:00 a.m. - 8:00 a.m.">
                      7:00 a.m. - 8:00 a.m.
                    </SelectItem>
                    <SelectItem value="8:00 a.m. - 9:00 a.m.">
                      8:00 a.m. - 9:00 a.m.
                    </SelectItem>
                    <SelectItem value="9:00 a.m. - 10:00 a.m.">
                      9:00 a.m. - 10:00 a.m.
                    </SelectItem>
                    <SelectItem value="10:00 a.m. - 11:00 a.m.">
                      10:00 a.m. - 11:00 a.m.
                    </SelectItem>
                    <SelectItem value="11:00 a.m. - 12:00 p.m.">
                      11:00 a.m. - 12:00 p.m.
                    </SelectItem>
                    <SelectItem value="12:00 p.m. - 1:00 p.m.">
                      12:00 p.m. - 1:00 p.m.
                    </SelectItem>
                    <SelectItem value="1:00 p.m. - 2:00 p.m.">
                      1:00 p.m. - 2:00 p.m.
                    </SelectItem>
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
