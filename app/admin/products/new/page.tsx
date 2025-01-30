import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

export default function CreateProductPage() {
    return (
        <>
            <Heading>Create Product</Heading>

            <p className="pb-2">
                Complete the following form to <span className="font-bold text-indigo-600">add a new product</span>
            </p>

            <GoBackButton />
            <div className="flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">

                    <div className="w-full mt-5">
                        <AddProductForm>
                            <ProductForm />
                        </AddProductForm>
                    </div>
                </div>
            </div>
        </>
    );
}
