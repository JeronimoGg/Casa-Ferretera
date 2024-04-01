import { Navbar } from "../../components/navegacion/navbar";
import { ReactNode } from "react";

const LayoutProfile = ({
  children,
  titulo,
}: {
  children: ReactNode;
  titulo: string;
}) => {
  return (
    <div>
      {" "}
      <header className="h-8">
        <Navbar titulo={titulo} />
      </header>
      {children}
    </div>
  );
};

export default LayoutProfile;
