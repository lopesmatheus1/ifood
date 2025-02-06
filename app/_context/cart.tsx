"use client";

import { Prisma } from "@prisma/client";
import { createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProducts
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { deliveryFee: true };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProducts[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  addProductToCart: (
    products: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { deliveryFee: true };
        };
      };
    }>,
    quantity: number,
  ) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
  cartIsOpen: boolean;
  toggleCart: () => void;
  totalQuantity: number;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  deleteProductFromCart: () => {},
  cartIsOpen: false,
  toggleCart: () => {},
  totalQuantity: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProducts[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleCart = () => setCartIsOpen(!cartIsOpen);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity * Number(product.price);
    }, 0);
  }, [products]);

  const totalDiscount = totalPrice - subTotalPrice;

  const deleteProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => {
        return cartProduct.id !== productId;
      }),
    );
  };

  const increaseQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };
  const decreaseQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        const cartProductQuantityIsOne = cartProduct.quantity === 1;
        if (cartProductQuantityIsOne) {
          return cartProduct;
        }

        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const addProductToCart = (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { deliveryFee: true };
        };
      };
    }>,
    quantity: number,
  ) => {
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }),
      );
    }

    const productIsFromDiferentRestaurant =
      products.length > 0 && products[0].restaurantId !== product.restaurantId;

    if (productIsFromDiferentRestaurant) {
      setProducts((prev) =>
        prev.filter((cartProduct) => {
          return cartProduct.restaurantId === product.restaurantId;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        toggleCart,
        increaseQuantity,
        decreaseQuantity,
        deleteProductFromCart,
        subTotalPrice,
        totalDiscount,
        totalPrice,
        cartIsOpen,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
