import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const [results] = await conn.query("SELECT * FROM nxsocine");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }    
}



export async function POST (request) {
    try {
        const {titulo, director, duracion} = await request.json();

        const [result] = await conn.query("INSERT INTO nxsocine SET ?", {
            titulo,
            director,
            duracion
        });
    
        return NextResponse.json({
            pelicula_id: result.insertId,
            titulo,
            director,
            duracion
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );       
    }
}