"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-toastify";

export default function ImageUpload({image} : {image: string | undefined}) {

    const [imageURL, setImageURL] = useState("");

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if(result.event === "success") {
                    widget.close();
                    toast.success("Image uploaded successfully!")
                    // @ts-ignore
                    setImageURL(result.info?.secure_url);
                }
            }}
            onError={(result) => {
                toast.error("Image upload failed!")
            }}
            uploadPreset="French Coffe Uploads"
            options={{ 
                maxFiles: 1
            }}
        >
            {({open}) => (
                <>
                    <div className="space-y-2">
                        <label htmlFor="" className="text-slate-800">Add Product Image</label>
                        <div 
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Click to upload an Image</p>

                            {imageURL && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        sizes="100%"
                                        style={{ objectFit: "contain" }}
                                        src={imageURL}
                                        alt="Uploaded Product Image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageURL &&  (
                        <div className="space-y-2">
                            <label className="text-slate-800 font-bold">Current Product Image</label>
                            <div className="relative w-64 h-64 mx-auto">
                                <Image
                                    fill
                                    sizes="100%"
                                    style={{ objectFit: "contain" }}
                                    src={getImagePath(image)}
                                    alt="Current Product Image"
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type="hidden" 
                        name="image" 
                        defaultValue={imageURL ? imageURL : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
