import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";


export async function GET(request, {params}) {
    try {
        const [result] = await conn.query("SELECT * FROM nxsocine WHERE pelicula_id=?", [
            params.pelicula_id,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Cartelera no econtrada",
                },
                {
                    status:404,
                }
            );
        }
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        )
    }
    
}

export async function DELETE(request, {params}) {
    try {
        const result = await conn.query("DELETE FROM nxsocine WHERE pelicula_id=?", [
            params.pelicula_id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Cartelera no encontrada",
                },
                {
                    status: 404,
                }
            );
        }
        return new Response(null, {
            status: 204
        })
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        );
    }    
}

export async function PUT(request, {params}) {
    try {
        const data = await request.json();
        const result = await conn.query("UPDATE nxsocine SET ? WHERE pelicula_id=?", [
            data,
            params.pelicula_id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Cartelera no econtrada",
                },
                {
                    status: 404,
                }
            );
        }

        const updateCartelera = await conn.query(
            "SELECT * FROM nxsocine WHERE pelicula_id = ?",
            [params.pelicula_id]
        );

        return NextResponse.json(updateCartelera[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        );
    }   
}