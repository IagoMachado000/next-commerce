"use client";

import { useCartStore } from "@/store";

export default function ClearCart() {
  const clearCart = useCartStore((state) => state.clearCart);
  
  return (
    <button 
      onClick={clearCart}
      className="max-w-max rounded-md bg-teal-800 text-white p-2 mt-2 cursor-pointer"
    >
      Limpar Carrinho
    </button>
  );
}
