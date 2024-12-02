"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

function Buttons({carteleraId}) {

    const router = useRouter();

    return (
        <div className="flex gap-x-2 mt-6">
            <button className="text-black font-semibold bg-red-800 hover:bg-red-700 py-1 px-3 rounded text-sm"
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


            <button className="text-zinc-400 font-semibold bg-blue-700 hover:bg-blue-600 py-1 px-3 rounded text-sm"
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