export const Title = ({titulo}:
  {
    titulo: string
  }) => {
    return (
      <div>
        <h1 className=" text-xl font-bold">
          {titulo}
        </h1>
      </div>
    );
}

