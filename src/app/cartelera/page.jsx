"use client"

import CarteleraCard from "@/components/CarteleraCard";
import axios from "axios"
import { useEffect, useState } from "react";



function CarteleraPage() {
    const [cartelera, setCartelera] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/cartelera`);
                setCartelera(data);
            } catch (error) {
                console.error("error fetch: ", error);
            }
        }
        fetchData();
    }, []);


    return <div className="grid gap-8 my-12 sm:mx-0 md:mx-0 lg:mx-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {cartelera.map(cartelera => (
            <CarteleraCard cartelera={cartelera} key={cartelera.pelicula_id} />
        ))}


    </div>
}

export default CarteleraPage;