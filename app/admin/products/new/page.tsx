import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {
    return (
        <>
            <Heading>Create Product</Heading>

            <p className="border-b pb-5">
                Complete the following form to <span className="font-bold text-indigo-600">add a new product</span>
            </p>

            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}
