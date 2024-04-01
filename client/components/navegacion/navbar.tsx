

import { Logo } from "@/components/navegacion/comp/logo";
import { MenuBar } from "@/components/navegacion/comp/menu";
import { Title } from "@/components/navegacion/comp/title";


export const Navbar = ({titulo}:{
  titulo: string
}) => {
  return (
      <nav>
        <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center">
          <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
            <Logo />
            <Title titulo={titulo}/>
            <MenuBar />
          </div>
        </div>
      </nav>
  );
};
