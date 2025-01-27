import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex justify-center mt-5">
            <div className="relative w-32 h-32">
                <Image
                    fill
                    alt="Logo French Coffe"
                    src={"/logo.svg"}
                />
            </div>
        </div>
    )
}
