
import { EditProductPage } from '../../_components/add_product/EditProductPage';

type EditProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProduct({ params }: EditProductPageProps) {
    const { slug } = await params;
    return(
        <main className=""> 
            <EditProductPage productSlug={slug}/>
        </main>
    )
}