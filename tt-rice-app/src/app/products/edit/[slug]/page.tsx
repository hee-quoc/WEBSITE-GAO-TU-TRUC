
import { EditProductPage } from '../../_components/add_product/EditProductPage';
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';
type EditProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProduct({ params }: EditProductPageProps) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        notFound();
    }
    const { slug } = await params;
    return(
        <main className=""> 
            <EditProductPage productSlug={slug}/>
        </main>
    )
}