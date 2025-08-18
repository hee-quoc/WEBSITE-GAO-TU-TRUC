
export async function uploadFileToS3(url:string, file:File){
    await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
        "Content-Type": file.type,
    },
    });
}
// export const createPresignedUrl = api.s3.createPresignedUrl.useMutation();