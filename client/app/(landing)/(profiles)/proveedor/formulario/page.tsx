"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";

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
  email: z.string().email("Este campo debe ser un email").nonempty("Este campo es requerido"),
  sede: z.enum(["asd","bsd","csd","fsx"]),
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
})


export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enterprise: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
            name="sede"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account type</FormLabel>
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
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/AAAA" {...field} />
                </FormControl>
                <FormDescription>
                  Esta es tu empresa o nombre de tu negocio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
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
            control={form.control}
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
