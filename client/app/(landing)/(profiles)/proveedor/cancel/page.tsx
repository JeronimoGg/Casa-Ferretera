import LayoutProfile from "@/app/(landing)/layout";
import { CancelPromotorias }  from "@/components/card/cancelPromotorias";


const AuxiliarDeMercadeoPage = () => {
    // El título se define aquí y se pasa a LayoutProfile
    const titulo = "Cancelar Promotorias";
  
    return (
      <LayoutProfile titulo={titulo}>
        <div>
                  <h2 className="text-center text-5xl font-bold mt-9">Promotorias</h2>
                  <p className="text-center mt-8 text-xl">Seleciones la promotorias que desea cancelar  </p>
              </div>
              <div className="flex flex-row justify-center mt-16">
                  <CancelPromotorias 
                      numero={"1"}
                      nombreEmpresa={"empresa 1"}
                      nombreProveedor={"juanito 123"}
                      sede={"palace"}
                      fecha={"01-02-2002"}
                      link={"/proveedor/formulario"}
                  />
              </div>
      </LayoutProfile>
    );
  };
  
  export default AuxiliarDeMercadeoPage;