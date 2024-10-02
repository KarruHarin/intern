import img from "@/app/images/doc1.png";
import Image from "next/image";

export default function Review() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-bold text-lg md:text-xl">Reviews</h1>
            </div>

            {/* Repeating Review Block */}
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex flex-col">
                    <div className="border-2 rounded-lg bg-gray-200">
                        <div className="flex flex-col md:flex-row justify-between p-3 items-center">
                            <div className="flex items-center mb-3 md:mb-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    <Image src={img} alt="doc" className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-sm md:text-md font-semibold">Praveen</h1>
                                    <p className="text-xs md:text-sm text-gray-600">24 years old</p>
                                </div>
                            </div>
                            <div className="text-sm md:text-md text-gray-500">
                                <h1>11/11/11</h1>
                            </div>
                        </div>
                        <div className="px-5 pb-5 w-full md:w-[45vw]">
                            <p className="text-sm md:text-md text-gray-700">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laborum repellat velit voluptas. Aspernatur similique vel obcaecati illum sit quibusdam consequatur saepe nihil eveniet, accusantium non maxime vero earum corrupti.
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
