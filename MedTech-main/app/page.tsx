import NavBar from "../components/home/Navbar"
import Hero from "../components/home/Hero"
import { Services } from "@/components/home/Services";
import { TextCard } from "@/components/home/TextCard";
import { Footer } from "@/components/home/Footer";
import Team from "@/components/home/Team";
import Photo from "@/components/home/Photos";
import Narrative from "@/components/home/Narrative";
import News from "@/components/home/News";


  
export default function Home() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <TextCard/>
    <Services/>
    <Team/>
    <Narrative/>
    <News/>
    {/* <Photo/> */}
    <Footer/>
    </>
  );
}
