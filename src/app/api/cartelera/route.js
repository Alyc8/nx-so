import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";

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

export async function POST(request) {
    try {

        const data = await request.formData();
        const image = data.get("image");

        if (!data.get("titulo")) {
            return NextResponse.json(
                {
                    message: "Titulo es requerido",
                },
                {
                    status: 400,
                }
            );
        }

        if (!image) {
            return NextResponse.json(
                {
                    message: "Imagen es requerida",
                },
                {
                    status: 400,
                }
            );
        }

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
        })





        const [result] = await conn.query("INSERT INTO nxsocine SET ?", {
            titulo: data.get("titulo"),
            director: data.get("director"),
            duracion: data.get("duracion"),
            image: res.secure_url,
        });

        return NextResponse.json({
            pelicula_id: result.insertId,
            titulo: data.get("titulo"),
            director: data.get("director"),
            duracion: data.get("duracion")
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