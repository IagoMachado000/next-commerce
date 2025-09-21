"use client";

import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  product: ProductType;
  fill?: boolean;
  priority?: boolean;
};

const ProductImage = ({ product, fill, priority }: ProductImageProps) => {
  const [loading, setLoading] = useState(true);

  return fill ? (
    <Image
      src={product.image}
      fill
      priority={priority}
      alt={product.name}
      className={`object-cover ${
        loading
          ? "scale-110 blur-3xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
      onLoad={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      width={400}
      height={700}
      priority={priority}
      alt={product.name}
      className={`object-cover ${
        loading
          ? "scale-110 blur-3xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
      onLoad={() => setLoading(false)}
    />
  );
};

export default ProductImage;
