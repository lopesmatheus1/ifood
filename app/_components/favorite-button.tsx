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
      className="hover:bg-bg-secondary/50 h-full w-full rounded-full bg-secondary/50"
    >
      <HeartIcon
        className={`${isFavorite ? "fill-current text-primary" : "fill-none text-primary"} `}
        size={20}
      />
    </Button>
  );
};

export default FavoriteButton;
