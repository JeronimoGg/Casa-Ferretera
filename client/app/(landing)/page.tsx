import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]});


const LandingPage = () => {
    return (
        <div className={cn(" border-solid", montserrat.className)} >
            Hola
        </div>
    )
}

export default LandingPage;