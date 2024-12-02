import Link from "next/link"

function CarteleraCard({cartelera}) {
    return (
        
        <Link className="bg-black rounded-md  mb-3  hover:cursor-pointer border-4 border-zinc-700 p-4  hover:border-red-700  group "
            href={`/cartelera/${cartelera.pelicula_id}`}
        >

            {cartelera.image && (
                <img src={cartelera.image} className="w-full  sm:h-auto md:h-80 lg:h-96 object-cover " alt=""/>
            )}

            <div className="py-2 px-3 ">
                <h1 className="text-white text-lg font-bold group-hover:text-red-700">{cartelera.titulo}</h1>
                <h2 className="text-sm font-semibold text-white">{cartelera.director}</h2>
                <h2 className="text-sm text-white">{cartelera.duracion}</h2>
            </div>
            

        </Link>
    )
}

export default CarteleraCard