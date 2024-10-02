import { auth } from "@/auth";
import DocProfile from "@/components/Doctor/DocProfile/DocProfile";
import Profile from "@/components/Profile/Profile";



export default async function ProfilePage() {

    const session = await auth();
    const id = session?.user.id 
    const role = session?.user.role 


    return (
      <>{role==="DOCTOR"?
        <DocProfile id={id}/>:
        <Profile id={id}/>
      }</>
    )
}