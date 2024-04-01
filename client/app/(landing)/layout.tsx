import { Navbar } from "../../components/navegacion/navbar";

const LayoutProfile = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <header>
        <Navbar />
      </header>
      <hr />
      {children}
    </body>
  );
};

export default LayoutProfile;
