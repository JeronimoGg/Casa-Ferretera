import LayoutProfile from "@/app/(landing)/layout";

const RevisarAuxiliarDeMercadeoPage = () => {
  const titulo = "Auxiliar de Mercadeo";
  return (
    <LayoutProfile titulo={titulo}>
      <div>
        <h2 className="text-center text-5xl font-bold mt-9">Revise sus Promotorías</h2>
        <p className="text-center mt-8 text-xl">
          Revise las promotorías que se encuentran activas
        </p>
      </div>
      <aside className="flex flex-row justify-center mt-16">
        s
      </aside>
    </LayoutProfile>
  );
};

export default RevisarAuxiliarDeMercadeoPage;
