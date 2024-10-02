"use client";
import { docEnroll } from "@/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Country, State, City } from 'country-state-city';
import FormSucess from "@/components/auth/form-sucess";
import FormError from "@/components/auth/form-error";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { EnrollDoctorProfile } from "@/actions/DoctorEnroll/enrollDoctorProfile";


export default function Page(){
    const router = useRouter();  
    const {id,role}= useUser()
   
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof docEnroll>>({
        resolver: zodResolver(docEnroll),
        defaultValues: {
            legalName: "",
            gender: "Male",
            dateOfBirth: "",
            qualification: "",
            specialization: "",
            subSpecialist: "",
            experienceYears: "0",
            consultationFees: "0",
            address: "",
            country: "",
            state: "",
            city: "",
            BookedAppointment:0
        }
    });

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = event.target.value;
        form.setValue('country', selectedCountry);
        form.setValue('state', '');
        form.setValue('city', '');
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedState = event.target.value;
        form.setValue('state', selectedState);
        form.setValue('city', '');
    };
   
    const onSubmit = (values:any) => {        
        startTransition(() => {
            EnrollDoctorProfile(id,values).then((data:any) => {
               
               if(data.success){
               
                router.push('/dashboard/doctorEnrollment/details') }
          });
        });
      };
  
      if(role!=="DOCTOR"){
        router.push('/dashboard')
        return(<h2>Only for doctors</h2>)
    }
    return(
        <div className="flex flex-col justify-center items-center w-full p-5 mb-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col sm:flex-row sm:mb-5 sm:gap-10">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="legalName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Legal Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Enter your full name"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex flex-col">
                                            <FormLabel className="px-2 py-1.5 text-sm font-semibold">Gender</FormLabel>
                                            <FormControl>
                                                <select
                                                    disabled={isPending}
                                                    {...field}
                                                    className="flex h-9 w-[20vw] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:mb-5 sm:gap-10">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="dd/mm/yyyy"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="qualification"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Qualification</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Enter your Qualification"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:mb-5 sm:gap-10">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specialization</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Specialization"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="subSpecialist"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sub Specialist</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Enter your Sub Specialist"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:mb-5 sm:gap-10">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="experienceYears"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Experience in Years</FormLabel>
                                        <FormControl>
                                            <Input
                                            type="number"
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Enter Experience in Years"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="consultationFees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Consultation Fees</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Enter your Consultation Fees"
                                                className="sm:w-[20vw] w-[50vw]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="Enter your Address"
                                            className="sm:w-[43vw] w-[50vw]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-10 w-full mt-5">
                        <div className="flex flex-col">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => {
                                    const countries = Country.getAllCountries();
                                    return (
                                        <FormItem>
                                            <div className="flex flex-col">
                                                <FormLabel className="px-2 py-1.5 text-sm font-semibold">Select Country</FormLabel>
                                                <FormControl>
                                                    <select
                                                        {...field}
                                                        onChange={(event) => {
                                                            handleCountryChange(event);
                                                            field.onChange(event);
                                                        }}
                                                        disabled={isPending}
                                                        className="flex h-9 sm:w-[20vw] w-[50vw] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                    >
                                                        <option value="">Select Country</option>
                                                        {countries.map((country) => (
                                                            <option key={country.isoCode} value={country.isoCode}>
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => {
                                    const states = State.getStatesOfCountry(form.watch('country'));
                                    return (
                                        <FormItem>
                                            <FormLabel className="px-2 py-1.5 text-sm font-semibold">Select State</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    onChange={(event) => {
                                                        handleStateChange(event);
                                                        field.onChange(event);
                                                    }}
                                                    disabled={!form.watch('country') || isPending}
                                                    className="flex h-9 sm:w-[20vw] w-[50vw] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                >
                                                    <option value="">Select State</option>
                                                    {states.map((state) => (
                                                        <option key={state.isoCode} value={state.isoCode}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-10 w-full mt-5">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => {
                                    const cities = City.getCitiesOfState(
                                        form.watch('country'),
                                        form.watch('state')
                                    );
                                    return (
                                        <FormItem>
                                            <FormLabel className="px-2 py-1.5 text-sm font-semibold">Select City</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    disabled={!form.watch('state') || isPending}
                                                    className="flex h-9 sm:w-[20vw] w-[50vw] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                                >
                                                    <option value="">Select City</option>
                                                    {cities.map((city) => (
                                                        <option key={city.name} value={city.name}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <FormSucess message="" />
                    <FormError message="" />
                    <Button
                        className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                        disabled={isPending}
                        type="submit"
                    >
                        Next
                    </Button>
                </form>
            </Form>
        </div>
    )
}