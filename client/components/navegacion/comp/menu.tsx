import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";


import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export const MenuBar = () => {
    return (
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <HamburgerMenuIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/supervisor">Supervisor</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/promotor">Promotor</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/proveedor">Proveedor</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/auxiliar-de-mercadeo">Auxiliar de Mercadeo</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/login">Cerrar sesion</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    );
}