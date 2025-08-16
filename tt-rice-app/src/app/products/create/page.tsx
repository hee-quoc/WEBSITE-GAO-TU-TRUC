import { AddProductPage } from '../_components/add_product/AddProductPage';
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';

export default async function AddProduct() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        notFound();
    }
    if (session?.user){
        return(
            <main className=""> 
                <AddProductPage />
            </main>
        )
    }
}