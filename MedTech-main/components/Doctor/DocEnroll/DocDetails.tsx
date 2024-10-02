// "use client";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { docDeatail } from "@/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import FormSucess from "@/components/auth/form-sucess";
// import FormError from "@/components/auth/form-error";

// export default function DocDetails() {
//     const form = useForm<z.infer<typeof docDeatail>>({
//         resolver: zodResolver(docDeatail),
//         defaultValues: {
//             startTime: "",
//             endTime: "",
//             week: [],
//             fee: "",
//             sessionLength: "",
//             language: [],
//         },
//     });

//     const [isPending] = useState(false);
//     const languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "Kanada"];

//     const toggleLanguage = (language: string) => {
//         const currentLanguages = form.getValues("language");
//         const updatedLanguages = currentLanguages.includes(language)
//             ? currentLanguages.filter((lang) => lang !== language)
//             : [...currentLanguages, language];
//         form.setValue("language", updatedLanguages);
//     };

//     return (
//         <div className="flex flex-col p-5 sm:p-10 gap-8 sm:gap-10">
//             <div className="flex flex-col text-center sm:text-left">
//                 <h1 className="text-xl font-bold">Add Availability</h1>
//                 <p>Visitors will only be able to schedule appointments during available hours</p>
//             </div>
//             <div className="flex sm:flex-row flex-col sm:text-left text-center gap-8 sm:gap-10">
//                 <Form {...form}>
//                     <form>
//                         <div className="flex sm:flex-row flex-col gap-5">
//                             <div className="flex flex-col gap-3 mb-5 w-full sm:w-auto">
//                                 <FormField
//                                     control={form.control}
//                                     name="startTime"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="font-semibold text-lg">Time when you will be available</FormLabel>
//                                             <FormControl className=" text-center sm:text-left">
//                                                 <Select>
//                                                     <SelectTrigger className="w-full sm:w-[20vw]">
//                                                         <SelectValue placeholder="Select start time" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="08:00">08:00 AM</SelectItem>
//                                                         <SelectItem value="09:00">09:00 AM</SelectItem>
//                                                         <SelectItem value="10:00">10:00 AM</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-3 mt-auto mb-5 w-full sm:w-auto">
//                                 <FormField
//                                     control={form.control}
//                                     name="endTime"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormControl className="text-center sm:text-left">
//                                                 <Select>
//                                                     <SelectTrigger className="w-full sm:w-[20vw]">
//                                                         <SelectValue placeholder="Select end time" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="17:00">05:00 PM</SelectItem>
//                                                         <SelectItem value="18:00">06:00 PM</SelectItem>
//                                                         <SelectItem value="19:00">07:00 PM</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex mb-5 flex-col gap-3">
//                             <FormField
//                                 control={form.control}
//                                 name="week"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel className="font-semibold text-lg">Choose any day of the week to repeat this availability.</FormLabel>
//                                         <FormControl>
//                                             <div className="flex pt-4 flex-wrap gap-4 justify-center sm:justify-start">
//                                                 {["M", "Tu", "W", "Th", "F", "Sat", "S"].map((day) => (
//                                                     <label key={day} className="flex items-center">
//                                                         <input
//                                                             type="checkbox"
//                                                             value={day}
//                                                             className="hidden"
//                                                             checked={field.value.includes(day)}
//                                                             onChange={(e) => {
//                                                                 const selectedDays = [...field.value];
//                                                                 if (e.target.checked) {
//                                                                     selectedDays.push(day);
//                                                                 } else {
//                                                                     const index = selectedDays.indexOf(day);
//                                                                     if (index > -1) {
//                                                                         selectedDays.splice(index, 1);
//                                                                     }
//                                                                 }
//                                                                 field.onChange(selectedDays);
//                                                             }}
//                                                         />
//                                                         <div className={`w-12 h-10 flex items-center justify-center border-2 rounded-md ${field.value.includes(day) ? 'bg-purple-600' : 'bg-gray-200'} cursor-pointer`}>
//                                                             <span className={`${field.value.includes(day) ? 'text-white' : 'text-gray-800'}`}>{day}</span>
//                                                         </div>
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <div className="flex sm:flex-row flex-col gap-5">
//                             <div className="flex flex-col gap-3 mb-5 w-full sm:w-auto">
//                                 <FormField
//                                     control={form.control}
//                                     name="fee"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="font-semibold text-lg sm:text-left text-center">Fees Per Session</FormLabel>
//                                             <FormControl className="text-center sm:text-left">
//                                                 <Input
//                                                     disabled={isPending}
//                                                     {...field}
//                                                     placeholder="Enter your fee"
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-3 mt-auto mb-5 w-full sm:w-auto">
//                                 <FormField
//                                     control={form.control}
//                                     name="sessionLength"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel className="font-semibold text-lg">Session Length</FormLabel>
//                                             <FormControl className="text-center sm:text-left">
//                                                 <Input
//                                                     disabled={isPending}
//                                                     {...field}
//                                                     placeholder="Enter session length"
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-3 mb-5">
//                             <FormField
//                                 control={form.control}
//                                 name="language"
//                                 render={({ field }) => (
//                                     <FormItem className="flex flex-col ">
//                                         <FormLabel className="font-semibold text-lg">Select the Known Languages</FormLabel>
//                                         <FormControl className="text-center sm:text-left">
//                                             <Popover>
//                                                 <PopoverTrigger asChild>
//                                                     <Button variant="outline" className="w-full sm:w-[20vw] text-left">
//                                                         {field.value.length > 0
//                                                             ? `Selected: ${field.value.join(", ")}`
//                                                             : "Select languages"}
//                                                     </Button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent className="w-full sm:w-[20vw]">
//                                                     {languages.map((language) => (
//                                                         <div key={language} className="flex items-center space-x-2">
//                                                             <Checkbox
//                                                                 checked={field.value.includes(language)}
//                                                                 onCheckedChange={() => toggleLanguage(language)}
//                                                                 id={language}
//                                                             />
//                                                             <label htmlFor={language} className="text-sm font-medium">
//                                                                 {language}
//                                                             </label>
//                                                         </div>
//                                                     ))}
//                                                 </PopoverContent>
//                                             </Popover>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <FormSucess message="" />
//                         <FormError message="" />
//                         <Button
//                             className="w-[20vw] h-10 mt-5 bg-purple-700 hover:bg-purple-500"
//                             disabled={isPending}
//                             type="submit"
//                         >
//                             Next
//                         </Button>
//                     </form>
//                 </Form>
//             </div>
//         </div>
//     );
// }
