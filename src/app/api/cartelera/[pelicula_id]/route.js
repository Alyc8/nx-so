import cloudinary from "@/libs/cloudinary";
import { conn } from "@/libs/mysql";
import { processImage } from "@/libs/processImage";
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
        const data = await request.formData();
        const image = data.get("image");
        const updateData = {
            titulo: data.get("titulo"),
            director: data.get("director"),
            duracion: data.get("duracion"),
        };

        if(!data.get("titulo")) {
            return NextResponse.json(
                {
                    message: "Titulo es requerido",
                },
                {
                    status: 400,
                }
            );
        }

        if (image) {
            const buffer = await processImage(image);

            const res = await new Promise((resolve, reject) => {
                cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                    },
                    async (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(result);
                    }
                )
                .end(buffer);
            });

            updateData.image = res.secure_url;

            const result = await conn.query("UPDATE nxsocine SET ? WHERE pelicula_id=?", [
                updateData,
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
        }
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