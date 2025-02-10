import { Suspense } from "react";
import Header from "../_components/header";
import Restaurants from "./_components/restaurant";

const RestaurantsPage = () => {
  return (
    <>
      <Header />
      <Suspense>
        <Restaurants />
      </Suspense>
    </>
  );
};

export default RestaurantsPage;
