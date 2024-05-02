import LayoutProfile from "@/app/(landing)/layout";
import { Servicio } from "@/components/card/servicio";
import user from "@/public/social.svg";

const manageUsers = () => {
    const titulo = "Usuarios";
    return(
        <LayoutProfile titulo={titulo}> 
            <div className="flex flex-row justify-center mt-16">
                <Servicio 
                  titulo={"Revisar Promotores"}
                  descripcion={"Listar los promotores registrados"}
                  icon={user}
                  boton={"Revisar"}
                  link={"/auxiliar-de-mercadeo/usuarios/promotores"}
                />
                <Servicio 
                  titulo={"Revisar Proveedores"}
                  descripcion={"Listar los proveedores registrados"}
                  icon={user}
                  boton={"Revisar"}
                  link={"/auxiliar-de-mercadeo/usuarios/proveedores"}
                />
                <Servicio 
                  titulo={"Revisar Supervisores"}
                  descripcion={"Listar los supervisores registrados"}
                  icon={user}
                  boton={"Revisar"}
                  link={"/auxiliar-de-mercadeo/usuarios/supervisores"}
                />
            </div>
        </LayoutProfile>
    )
    
}

export default manageUsers;