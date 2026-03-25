import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  List,
  ListCheck,
  Pencil,
  Plus,
  SquareArrowOutDownLeft,
  SquareCheck,
  Trash2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Digite sua tarefa" />
          <Button variant="default" className="cursor-pointer">
            <Plus />
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-3" />
          <div className="flex gap-1.5">
            <Badge variant="default" className="cursor-pointer">
              <List />
              Todas
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              <SquareArrowOutDownLeft />
              Não Finalizadas
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              <SquareCheck />
              Concluídas
            </Badge>
          </div>

          <div className="mt-3 border-b">
            <div className="flex justify-between items-center h-14 border-t">
              <div className="w-1 h-full bg-green-400"></div>
              <p className="flex-1 px-2">Tarefa 1</p>

              <div className="flex items-center gap-2">
                <Pencil className="cursor-pointer" size={16} />
                <Trash2 className="cursor-pointer" size={16} />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluídas (3/3)</p>
            </div>
            <Button variant="outline" className="cursor-pointer text-xs h-7">
              <Trash2 />
              Limpar Tarefas Concluídas
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
