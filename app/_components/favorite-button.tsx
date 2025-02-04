"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };
  return (
    <Button
      onClick={handleFavoriteClick}
      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white hover:bg-white"
    >
      <HeartIcon
        className={`${isFavorite ? "fill-current text-primary" : "fill-none text-primary"} `}
        size={18}
      />
    </Button>
  );
};

export default FavoriteButton;
