import { BikeIcon, ClockIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTime">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="my-6 border-none py-2">
      <div className="flex justify-around">
        <div>
          {/* PREÇO */}
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Entrega</span>
            <BikeIcon className="text-muted-foreground" size={15} />
          </div>
          <p className="text-center font-semibold text-accent-foreground">
            {Number(restaurant.deliveryFee) === 0
              ? "Entrega Grátis"
              : formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        </div>

        {/* TEMPO */}
        <div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Entrega</span>
            <ClockIcon className="text-muted-foreground" size={15} />
          </div>
          <p className="text-center font-semibold text-accent-foreground">
            {restaurant.deliveryTime} min
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
