import { useForm } from "react-hook-form";
import FormError from "../auth/form-error";
import FormSucess from "../auth/form-sucess";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AppointmentSchema = z.object({
    purpose: z.string().min(1, "Purpose is required"),
    name: z.string().min(1, "Name is required"),
    age: z.number().min(1, "Age is required"),
    gender: z.string().min(1, "Gender is required"),
});

type AppointmentFormInputs = z.infer<typeof AppointmentSchema>;

export default function Appoint2({ onChangeApp }: any) {
    const form = useForm<AppointmentFormInputs>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            purpose: "",
            name: "",
            age: 0,
            gender: "",
        },
    });

    const onSubmit = async (values: AppointmentFormInputs) => {
        onChangeApp(values);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-5">
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg pb-3">Describe the purpose of the consultation in details</h1>
                    <div className="w-full">
                        <input
                            className="border-2 rounded-sm p-4 w-full"
                            placeholder="Hello Doctor, I want to consult with you because..."
                            {...form.register("purpose")}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg pb-3 pt-3">Patient Details</h1>
                    <div className="w-full">
                        <label className="text-gray-700">Name*</label>
                        <div className="pt-3">
                            <input
                                className="border-2 rounded-sm p-4 w-full"
                                placeholder="Swetha"
                                {...form.register("name")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex pt-3 gap-7">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label className="text-gray-700">Age*</label>
                            <div className="pt-3">
                                <input
                                    type="number"
                                    className="border-2 rounded-sm p-4 w-full"
                                    placeholder="Please Enter Age"
                                    {...form.register("age", { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label className="text-gray-700">Gender*</label>
                            <div className="pt-3">
                                <select
                                    className="border-2 rounded-sm p-4 w-full"
                                    {...form.register("gender")}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <Button
                        className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                        type="submit"
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </form>
    );
}
