import Link from "next/link"

function NavBar() {
  return (
    <nav className="bg-zinc-950 text-red-700">
        <div className="container mx-auto flex justify-between items-center">
            
            <Link className="font-bold text-3xl  py-4" href="/">
                Cinema
            </Link>

            <ul>
                <li>
                    <Link className="text-red-700" href="/new">
                        Nuevo
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar