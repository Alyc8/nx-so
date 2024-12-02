import Link from "next/link"

function NavBar() {
  return (
    <nav className="bg-zinc-950 text-red-700">
        <div className="container mx-auto flex justify-between items-center p-4">
            
            <Link className="text-3xl font-extrabold" href="/">
                CINEMA K
            </Link>

            <ul>
                <li>
                    <Link className="bg-red-700 text-black font-semibold py-1 px-4 rounded-lg" href="/new">
                        Nuevo
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar