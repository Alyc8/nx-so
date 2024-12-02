import Link from "next/link"

function CarteleraCard({cartelera}) {
    return (
        
        <Link className=" bg-white  border-red-700 border-4 mb-3 hover:bg-gray-200 hover:cursor-pointer"
            href={`/cartelera/${cartelera.pelicula_id}`}
        >

            {cartelera.image && (
                <img src={cartelera.image} className="w-full h-72 object-cover  " alt=""/>
            )}

            <div className="py-2 px-3">
                <h1 className="text-slate-800 text-lg font-bold">{cartelera.titulo}</h1>
                <h2 className="text-sm font-semibold text-slate-700">{cartelera.director}</h2>
                <h2 className="text-sm text-slate-700">{cartelera.duracion}</h2>
            </div>
            

        </Link>
    )
}

export default CarteleraCard