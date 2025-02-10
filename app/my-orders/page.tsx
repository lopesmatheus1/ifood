import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrders = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/");

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: {
      restaurant: true,
      orderProduct: { include: { product: true } },
    },
  });
  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
