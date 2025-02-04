import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex gap-3">
      <Input
        className="border-none active:border"
        placeholder="Buscar Restaurantes"
      />
      <Button className="h-10 w-10">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
