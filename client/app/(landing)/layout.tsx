import { Navbar } from "./_components/navbar";

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
