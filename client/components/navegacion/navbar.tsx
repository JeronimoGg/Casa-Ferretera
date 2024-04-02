import { Logo } from "@/components/navegacion/comp/logo";
import { MenuBar } from "@/components/navegacion/comp/menu";
import { Title } from "@/components/navegacion/comp/title";

export const Navbar = ({ titulo }: { titulo: string }) => {
  return (
      <nav className="md:max-w-screen mx-auto flex items-center w-full justify-between">
        <Logo />
        <Title titulo={titulo} />
        <MenuBar />
      </nav>
  );
};
