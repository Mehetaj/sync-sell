"use client";  

import { useEffect, useState } from "react";
import ProductDetails from "./product-details";
import { fetchProducts } from "../../../app/store/features/product-slice";
import { createSlug } from "../../../lib/products";
import { useDispatch, useSelector } from "react-redux";



export default function ProductPage({ params }) {
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(null);
  
  const products = useSelector((state) => state.product?.items);
  const loading = useSelector((state) => state.product?.loading);
  const error = useSelector((state) => state.product?.error);

  // Resolve params.slug
  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams?.slug);
    });
  }, [params]);

  // Fetch all products if not already loaded
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products?.length]);


  // Find the product directly inside the component
  const product = slug ? products?.find((product) => createSlug(product?.name) === slug) : undefined;

  if (!slug || loading) {
    return <p className="text-center py-12 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-12 text-xl text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center py-12 text-xl">Product not found</p>;
  }

  return <ProductDetails product={(product)} />;
}
