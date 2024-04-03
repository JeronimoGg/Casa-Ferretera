import Link from "next/link";
import LayoutProfile from "../../layout";
import { Button } from "@/components/ui/button";

const ProveedorPage = () => {
  const titulo = "Proveedor";

  return (
    <LayoutProfile titulo={titulo}>
      <Button>
        <Link href="/proveedor/formulario">
          Formulario
        </Link>
      </Button>
    </LayoutProfile>
  );
};

export default ProveedorPage;
