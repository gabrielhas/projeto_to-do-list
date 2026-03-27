"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/editTask";

import {
  List,
  ListCheck,
  Plus,
  Sigma,
  SquareArrowOutDownLeft,
  SquareCheck,
  Trash2,
} from "lucide-react";

import { getTasks } from "@/actions/get-tasks-from-db";
import { useEffect, useState } from "react";
import { Tasks } from "@/src/generated/prisma/client";
import { NewTask } from "@/actions/add-task-from-db";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteTask } from "@/actions/delete-task-from-db";

export default function Home() {
  const [tastList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handledGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (tasks) {
        setTaskList(tasks);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    if (!task || task.trim().length === 0) return;

    try {
      const newTask = await NewTask(task);

      if (!newTask) return;

      setTaskList([...tastList, newTask]);
      setTask(""); // Clear input state
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      if (!taskId) return;

      const deletedTask = await deleteTask(taskId);

      if (!deletedTask) return;
      handledGetTasks();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handledGetTasks();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <Card className="w-lg">
        <CardHeader className="flex gap-2 items-center">
          <Input
            placeholder="Digite sua tarefa"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer font-serif"
            onClick={handleAddTask}
          >
            Adicionar
            <Plus />
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-3" />
          <div className="flex gap-1.5">
            <Badge
              variant="default"
              className="cursor-pointer font-serif h-5.5"
            >
              <List />
              Todas
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer font-serif h-5.5"
            >
              <SquareArrowOutDownLeft />
              Não Finalizadas
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer font-serif h-5.5"
            >
              <SquareCheck />
              Concluídas
            </Badge>
          </div>

          <div className="mt-3 border-b">
            {tastList.map((task) => (
              <div
                className="flex justify-between items-center h-14 border-t"
                key={task.id}
              >
                <div className="w-1 h-full bg-green-400"></div>
                <p className="flex-1 px-2">{task.task}</p>

                <div className="flex items-center gap-2">
                  <EditTask />

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
                        <Button
                          variant="default"
                          className="cursor-pointer"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Sim
                        </Button>
                        <DialogClose
                          render={
                            <Button
                              variant="outline"
                              className="cursor-pointer"
                            >
                              Não
                            </Button>
                          }
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluídas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="outline"
                    className="cursor-pointer h-7 text-xs"
                  >
                    <Trash2 />
                    Limpar Tarefas Concluídas
                  </Button>
                }
              />

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir X itens?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso irá excluir
                    permanentemente os itens selecionados.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-red-600 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-4 gap-1">
            <Sigma size={18} />
            <p className="text-xs">Total de tarefas: 3</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
