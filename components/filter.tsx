import { List, SquareArrowOutDownLeft, SquareCheck } from "lucide-react";
import { Badge } from "./ui/badge";

export type FilterType = "all" | "pending" | "done";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex gap-1.5">
      <Badge
        variant={currentFilter === "all" ? "default" : "secondary"}
        className="cursor-pointer font-serif h-5.5"
        onClick={() => setCurrentFilter("all")}
      >
        <List />
        Todas
      </Badge>
      <Badge
        variant={currentFilter === "pending" ? "default" : "secondary"}
        className="cursor-pointer font-serif h-5.5"
        onClick={() => setCurrentFilter("pending")}
      >
        <SquareArrowOutDownLeft />
        Não Finalizadas
      </Badge>
      <Badge
        variant={currentFilter === "done" ? "default" : "secondary"}
        className="cursor-pointer font-serif h-5.5"
        onClick={() => setCurrentFilter("done")}
      >
        <SquareCheck />
        Concluídas
      </Badge>
    </div>
  );
};
