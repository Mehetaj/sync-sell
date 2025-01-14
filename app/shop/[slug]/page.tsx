import { getProductBySlug } from "@/lib/products";
import ProductDetails from "./product-details";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;  // Resolve the promise
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return <p className="text-center py-12 text-xl">Product not found</p>;
  }

  return <ProductDetails product={product} />;
}
