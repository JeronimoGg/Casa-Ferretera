import LayoutProfile from "@/app/(landing)/layout";
import calendar from "@/public/calendar.svg";
import svgReport from "@/public/report.svg"
import { Servicio } from "@/components/card/servicio";


const AuxiliarDeMercadeoPage = () => {
  // El título se define aquí y se pasa a LayoutProfile
  const titulo = "Auxiliar de Mercadeo";

  return (
    <LayoutProfile titulo={titulo}>
      <div>
                <h2 className="text-center text-5xl font-bold mt-9">Servicios</h2>
                <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
            </div>
            <div className="flex flex-row justify-center mt-16">
                <Servicio 
                    titulo={"Agendar Promotoria"}
                    descripcion={"Agende una promotoria"}
                    icon={calendar}
                    boton={"Agendar"}
                    link={"/proveedor/formulario"}
                />
                <Servicio 
                    titulo={"Generar Informes"}
                    descripcion={"Genere informes de las promotorias"}
                    icon={svgReport}
                    boton={"Generar"}
                    link={"/auxiliar-de-mercado/informes"}
                />
            </div>
    </LayoutProfile>
  );
};

export default AuxiliarDeMercadeoPage;
