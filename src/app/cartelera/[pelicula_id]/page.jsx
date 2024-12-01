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

        <section className="flex justify-center items-center">

            <div className="p-6 bg-white text-black">
                <p>Titulo: {cartelera.titulo}</p>
                <p>Director: {cartelera.director}</p>
                <p>Duración: {cartelera.duracion}</p>

                <Buttons carteleraId={cartelera.pelicula_id}/>
            </div>

        </section>
    )
}

export default CarteleraPage