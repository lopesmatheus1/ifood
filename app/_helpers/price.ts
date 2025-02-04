import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.priceDiscount === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.priceDiscount / 100);
  return Number(product.price) - discount;
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
