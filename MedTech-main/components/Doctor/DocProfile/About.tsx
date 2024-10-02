import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FaPencilAlt } from "react-icons/fa";
import { UpdateAbout } from "@/actions/doctor-profile/Update";

export default function About({ about,refresh, id }: any) {
    const [text, setText] = useState(about);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const updateAbout = async () => {
        const res = await UpdateAbout(id, text);
        if (res?.success) {
            refresh()
            setIsDialogOpen(false); 
        }
    };

    return (
        <div className="flex flex-col gap-5 sm:w-[50vw]">
            <div>
                <h1 className="font-bold">About Me</h1>
            </div>
            <div className="flex border-2 rounded-lg bg-gray-200 p-7">
                <p className="w-[80vw] sm:w-[44vw]">{about}</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <FaPencilAlt />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>Edit About</DialogTitle>
                        <Textarea 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Write about yourself..." 
                        />
                        <DialogFooter>
                            <Button onClick={updateAbout}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
