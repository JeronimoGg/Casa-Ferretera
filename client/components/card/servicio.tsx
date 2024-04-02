import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'
export const Servicio = ({ titulo, descripcion, icon, boton, link}: {
    titulo: string;
    descripcion: string;
    icon: string;
    boton: string;
    link: string;
}) => {
    return(
        <Card className="w-[350px] m-7">
            <CardContent className="flex flex-col items-center mt-10"> 
                <Image 
                    src={icon}
                    width={140}
                    height={140}
                    alt="Picture of a calendar"
                />
            </CardContent>
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
                <CardDescription>{descripcion}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center">
                <Button className="hover:bg-gray-200" variant="secondary">
                    <Link href={link}>{boton}</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}