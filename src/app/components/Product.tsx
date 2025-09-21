import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
  priority?: boolean;
};

const Product = ({ product, priority }: ProductProps) => {
  return (
    <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-65 flex-1">
          <ProductImage product={product} fill priority={priority} />
        </div>

        <div className="flex justify-between font-bold my-3">
          <p className="w-40 truncate">{product.name}</p>

          <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <AddCart product={product} />
    </div>
  );
};

export default Product;
