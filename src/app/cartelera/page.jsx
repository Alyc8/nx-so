import CarteleraCard from "@/components/CarteleraCard";
import axios from "axios"

async function loadCartelera() {
    const {data} = await axios.get("http://localhost:3030/api/cartelera");
    return data;
}

async function CarteleraPage() {
    const cartelera = await loadCartelera();
    console.log(cartelera);

    return <div className=" grid gap-10 grid-cols-4 mx-24 my-12 ">
        {cartelera.map(cartelera => (
            <CarteleraCard cartelera={cartelera} key={cartelera.pelicula_id}/>
        ))}

    </div>;
}

export default CarteleraPage;