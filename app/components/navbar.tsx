import Link from 'next/link'
import { type ReactNode } from "react";

type NavlinkProps = { href: string 
    children: ReactNode }

function NavLink(props: NavlinkProps) {
    return (
        <li className="  hover:bg-slate-600 py-2 px-2">
            <Link href={props.href}>{props.children}</Link>
        </li>
    )
}

export default function Navbar() {
  return (
    <nav className=" rounded-xl bg-slate-800/50 text-slate-50 shadow-xl">
        <ul className="container mx-auto flex-col items-start flex ">
            <NavLink href="/">Acceuil</NavLink>
            <NavLink href="/cv">Cv</NavLink>
            <NavLink href="/project">Project</NavLink>
        </ul>
    </nav>
  )
}