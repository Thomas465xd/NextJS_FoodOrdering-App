export default function Heading({children} : {children: React.ReactNode}) {
    return (
        <h1 className="text-2xl my-5">
            {children}
        </h1>
    )
}
