import { auth } from "@/auth";
import Appoint from "./Appoint";

export default async function Appoint0({ details }: any){

    const session = await auth();
    const user = session?.user;

    return(
        <Appoint user={user} details={details}/>
    )
}