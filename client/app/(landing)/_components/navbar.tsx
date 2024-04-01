

import { Logo } from "@/components/comp/logo";
import { MenuBar } from "@/components/comp/menu";


export const Navbar = () => {
  return (
    <header className=" h-16">
      <nav>
        <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center">
          <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
            <Logo />
            <MenuBar />
          </div>
        </div>
      </nav>
    </header>
  );
};
