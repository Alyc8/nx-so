"use client"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"

function CarteleraForm() {
    const [cartelera, setCartelera] = useState({
        titulo: "",
        director: "",
        duracion: 0,
    });

    const [file, setFile] = useState(null);

    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) => {
        setCartelera({
            ...cartelera,
            [e.target.name]:e.target.value
        });
    };

    useEffect(() => {
        if (params.pelicula_id) {
            axios.get('/api/cartelera/' + params.pelicula_id)
            .then(res => {
                setCartelera({
                    titulo: res.data.titulo,
                    director: res.data.director,
                    duracion: res.data.duracion,
                });
            });
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('titulo', cartelera.titulo);
        formData.append('director', cartelera.director);
        formData.append('duracion', cartelera.duracion);

        if (file) {
            formData.append("image", file);
        }

        if (!params.pelicula_id) {
            const res = await axios.post('/api/cartelera', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
            },
        });         
        } else {
            const res = await axios.put("/api/cartelera/" + params.pelicula_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }    
            });
        }

        form.current.reset(); 
        router.refresh();
        router.push('/cartelera')
    };


    return (
        <div>
            <form className="bg-zinc-900 shadow-md rounded-md px-8 pt-12 pb-12 mb-24 m-12"
                onSubmit={handleSubmit}
                ref={form}
            >

                <label 
                    htmlFor="name"
                    className="block text-white text-sm font-bold mb-2"
                >
                    Titulo
                </label>
                <input 
                    name="titulo"
                    type="text" 
                    placeholder="titulo" 
                    onChange={handleChange} 
                    value={cartelera.titulo}
                    className="text-black shadow appearance-none border rounded w-full py-2 px-3"
                    autoFocus
                />

                <label 
                    htmlFor="name"
                    className="block text-white text-sm font-bold mb-2 my-6"            
                >Director
                </label>
                <input 
                    name="director"
                    type="text" 
                    placeholder="Director" 
                    onChange={handleChange} 
                    value={cartelera.director}
                    className="text-black shadow appearance-none border rounded w-full py-2 px-3"
                />

                <label 
                htmlFor="name"
                className="block text-white text-sm font-bold mb-2 my-6"              
                >Duracion</label>
                <input 
                    name="duracion"
                    type="text"
                    placeholder="minutos" 
                    onChange={handleChange} 
                    value={cartelera.duracion}
                    className="text-gray-500 shadow appearance-none border rounded w-full py-2 px-3"
                />

                <label
                    htmlFor="carteleraPoster"
                    className="block text-white text-sm font-bold mb-2 my-6" 
                >
                    Poster:
                </label>
                <input type="file"
                    className="text-gray-500 shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }}
                />
                
                {file && (
                    <img 
                    className="w-64 h-64 object-contain mx-auto"
                    src={URL.createObjectURL(file)} alt="" 
                    />
                )}

                <button className="bg-red-800 hover:bg-red-700 text-black font-bold py-2 px-4 rounded mt-8">
                    {params.pelicula_id ? "Actualizar" : "Guardar"}
                </button>

            </form>


        </div>
    )
}

export default CarteleraForm