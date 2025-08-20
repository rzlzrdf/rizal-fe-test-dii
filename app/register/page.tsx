import { ArrowLeftIcon } from "lucide-react";
import FormRegistrasi from "./components/form-registrasi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
    return (
        <div className="mt-5">
            <Link href="/">
                <Button className="cursor-pointer border-teal-600 text-teal-600" variant={"outline"}>
                    <ArrowLeftIcon className="w-4 h-4" />
                    Kembali
                </Button>
            </Link>
            <FormRegistrasi />
        </div>
    )
}