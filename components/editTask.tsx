import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil } from "lucide-react";

export default function EditTask() {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="cursor-pointer" size={16} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input placeholder="Escreva a tarefa" />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
