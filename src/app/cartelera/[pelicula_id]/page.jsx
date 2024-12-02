import axios from "axios"
import Buttons from "./Buttons";

async function loadCartelera(carteleraId) {
    const { data } = await axios.get("http://localhost:3030/api/cartelera/" + carteleraId);
    return data;
}

async function CarteleraPage({ params }) {
    const cartelera = await loadCartelera(params.pelicula_id);
    console.log(cartelera)

    return (

        <section className="flex flex-col justify-center items-center h-[calc(100vh-10rem)] m-1">

            

            <div className="p-4 bg-white w-64 rounded-lg shadow-lg ">
                <img src={cartelera.image} className="w-full h-auto object-contain " alt="" />

            <div className="p-2">
            <h1 className="text-slate-800 text-lg font-bold">Titulo: {cartelera.titulo}</h1>
                <h2 className="text-sm font-semibold text-slate-700">Director: {cartelera.director}</h2>
                <h2 className="text-sm text-slate-700">Duración: {cartelera.duracion}</h2>

                <Buttons carteleraId={cartelera.pelicula_id}/>
            </div>
            </div>

        </section>
    )
}

export default CarteleraPage