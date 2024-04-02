import { Navbar } from "../../components/navegacion/navbar";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Fuente } from "@/components/fonts/monserrat";

const LayoutProfile = ({
  children,
  titulo,
}: {
  children: ReactNode;
  titulo: string;
}) => {
  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center",
          Fuente.className
        )}>
        <Navbar titulo={titulo} />
      </header>
      <main className={cn("pt-8", Fuente.className)}>{children}</main>
    </>
  );
};

export default LayoutProfile;
