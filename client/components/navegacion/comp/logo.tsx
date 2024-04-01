import Image from "next/image";
import logoIcon from "@/public/logo-fondos-claros.svg";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div>
        <Image src={logoIcon} alt="logo" width={85} height={100} />
      </div>
    </Link>
  );
};
