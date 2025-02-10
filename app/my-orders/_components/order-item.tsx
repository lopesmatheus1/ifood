"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";

import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProduct: { include: { product: true } };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "Confirmado";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Em preparo";
    case "DELIVERING":
      return "Em transporte";
    case "COMPLETED":
      return "Finalizado";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <Badge
          className={`text-muted-foreground ${order.status === "COMPLETED" || order.status === "CANCELED" ? "bg-[#eee]" : "bg-green-500 text-white"}`}
        >
          {getOrderStatusLabel(order.status)}
        </Badge>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant={"link"}
            size={"icon"}
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurant/${order.restaurant.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div>
          {order.orderProduct.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="text-white">{product.quantity}</span>
              </div>
              <span className="text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </p>

          <Button
            disabled={order.status !== "COMPLETED"}
            size={"sm"}
            className="text-primary"
            variant={"ghost"}
          >
            <Link href={`/restaurant/${order.restaurantId}`}>
              Refazer pedido
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
