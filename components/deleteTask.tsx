import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function DeleteTask() {
  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="cursor-pointer" size={16} />
      </DialogTrigger>

      <DialogContent className="w-65">
        <DialogHeader>
          <DialogTitle className="text-center">
            Deseja excluir essa tarefa?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-2">
          <Button variant="default" className="cursor-pointer">
            Sim
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
