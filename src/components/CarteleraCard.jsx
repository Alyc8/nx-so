import Link from "next/link"

function CarteleraCard({cartelera}) {
    return (
        <Link className="bg-white rounded-lg border-l-gray-800 mb-3 py-4 hover:bg-gray-200 hover:cursor-pointer"
            href={`/cartelera/${cartelera.pelicula_id}`}
        >
            <h1 className="text-slate-800 text-2xl font-bold">{cartelera.titulo}</h1>
            <h2 className="text-lg text-slate-700">{cartelera.director}</h2>
            <h2 className="text-slate-700">{cartelera.duracion}</h2>
        </Link>
    )
}

export default CarteleraCard