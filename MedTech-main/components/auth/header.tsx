
interface HeaderProps {
    title:string,
    label : string
}

export const Header = ({label,title}:HeaderProps)=>{
    return(
        <div className="flex flex-col justify-start items-center">
            <h1 >{title}</h1>
            <p>{label}</p>
        </div>
    )
}