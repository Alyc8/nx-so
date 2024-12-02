"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

function Buttons({carteleraId}) {

    const router = useRouter();

    return (
        <div className="flex gap-x-2 mt-2">
            <button className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-sm"
                onClick={async () => {
                    if (confirm('¿Estas seguro en eliminar?')) {
                        const res = await axios.delete('/api/cartelera/' +carteleraId)
                        if (res.status === 204){
                            router.push('/cartelera')
                            router.refresh()
                        }
                    }
                }}
            >
                Eliminar
            </button>


            <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded text-sm"
                onClick={() => {
                    router.push(`/cartelera/edit/${carteleraId}`);
                }}
            >
                Editar
            </button>
        </div>
    )
}

export default Buttons