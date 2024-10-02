import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function DocVerification() {
    const [preview1, setPreview1] = useState<string | null>(null);
    const [preview2, setPreview2] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const formSchema = z.object({
        document1: z
            .any()
            .refine((file) => file instanceof File && file.size !== 0, "Please upload a valid image"),
        document2: z
            .any()
            .refine((file) => file instanceof File && file.size !== 0, "Please upload a valid image"),
        registrationNumber1: z.string().min(1, "Registration number is required"),
        registrationNumber2: z.string().min(1, "Registration number is required"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form Submitted", data);
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>,
        fieldName: "document1" | "document2"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            form.setValue(fieldName, file);
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-5"
        >
            <div className="flex flex-col px-5 md:px-10 space-y-4">
                <h1 className="font-bold text-lg text-gray-800">Attach the Documents shown below</h1>
                <p className="text-gray-600">Medical Certificate</p>
                <p className="text-gray-600">Medical Licensing</p>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row items-center w-full sm:w-[50vw]">
                        <div className="flex flex-col flex-grow mr-0 md:mr-4">
                            <label className="font-medium text-gray-700">Document 1*</label>
                            <div className="relative mt-4 w-48 h-48 border-dotted border-2 border-gray-400 rounded-lg flex items-center justify-center">
                                {preview1 ? (
                                    <img
                                        src={preview1}
                                        alt="Document 1 Preview"
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-500">Preview Document 1</p>
                                )}
                            </div>
                            <input
                                type="file"
                                accept=".jpg,.png,.svg"
                                className="mt-2 block w-full text-sm text-gray-600
                                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-purple-700 file:text-white
                                    hover:file:bg-purple-400"
                                onChange={(e) => handleFileChange(e, setPreview1, "document1")}
                            />
                            {form.formState.errors.document1?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {String(form.formState.errors.document1.message)}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col flex-shrink-0 w-full md:w-[20vw] mt-4 md:mt-0">
                            <label className="font-medium text-gray-700">Medical Registration Number*</label>
                            <input
                                type="text"
                                {...form.register("registrationNumber1")}
                                className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter registration number"
                            />
                            {form.formState.errors.registrationNumber1?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {String(form.formState.errors.registrationNumber1.message)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center w-full sm:w-[50vw]">
                        <div className="flex flex-col flex-grow">
                            <label className="font-medium text-gray-700">Document 2*</label>
                            <div className="relative mt-4 w-48 h-48 border-dotted border-2 border-gray-400 rounded-lg flex items-center justify-center">
                                {preview2 ? (
                                    <img
                                        src={preview2}
                                        alt="Document 2 Preview"
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-500">Preview Document 2</p>
                                )}
                            </div>
                            <input
                                type="file"
                                accept=".jpg,.png,.svg"
                                className="mt-2 block w-full text-sm text-gray-600
                                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-purple-700 file:text-white
                                    hover:file:bg-purple-400"
                                onChange={(e) => handleFileChange(e, setPreview2, "document2")}
                            />
                            {form.formState.errors.document2?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {String(form.formState.errors.document2.message)}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col flex-shrink-0 w-full md:w-[20vw] mt-4 md:mt-0">
                            <label className="font-medium text-gray-700">Medical License Number*</label>
                            <input
                                type="text"
                                {...form.register("registrationNumber2")}
                                className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter registration number"
                            />
                            {form.formState.errors.registrationNumber2?.message && (
                                <p className="text-red-500 text-sm mt-2">
                                    {String(form.formState.errors.registrationNumber2.message)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full md:w-[20vw] h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                    disabled={isPending}
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
