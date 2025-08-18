import { api } from "~/trpc/react";

export async function uploadFileToS3(url:string, file:File){
    const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });
}