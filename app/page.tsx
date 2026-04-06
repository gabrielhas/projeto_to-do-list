"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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

import { ListCheck, LoaderCircle, Plus, Sigma, Trash2 } from "lucide-react";

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
import { updateTaskStatus } from "@/actions/toggle-done";
import { Filter, FilterType } from "@/components/filter";
import { deleteCompletedTasks } from "@/actions/clear-completed-tasks";

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

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
    setLoading(true);
    if (!task || task.trim().length === 0) {
      toast.error("Digite uma tarefa", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    try {
      const newTask = await NewTask(task);

      if (!newTask) return;

      setTaskList([...taskList, newTask]);
      setTask("");
      toast.success("Tarefa adicionada com sucesso!", {
        position: "top-center",
      });
      await handledGetTasks();
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      if (!taskId) return;

      const deletedTask = await deleteTask(taskId);

      if (!deletedTask) return;
      toast.info("Tarefa excluída com sucesso!", {
        position: "top-center",
      });
      await handledGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handToggleTask = async (taskId: number) => {
    const previousTask = [...taskList];

    try {
      setTaskList((prevTask) => {
        const updatedTaskList = prevTask.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          }
          return task;
        });

        return updatedTaskList;
      });

      const updatedTask = await updateTaskStatus(taskId);

      if (!updatedTask) return;

      toast.success("Tarefa atualizada com sucesso!", {
        position: "top-center",
      });
      await handledGetTasks();
    } catch (error) {
      setTaskList(previousTask);
      throw error;
    }
  };

  const clearCompletedTasks = async () => {
    const deletedTasks = await deleteCompletedTasks();

    if (!deletedTasks) {
      toast.error("Não existem tarefas concluídas para serem excluídas.", {
        position: "top-center",
      });
      return;
    }

    toast.info("Tarefas concluídas excluídas com sucesso!", {
      position: "top-center",
    });
    await handledGetTasks();
  };

  useEffect(() => {
    handledGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        setFilteredTasks(taskList.filter((task) => !task.done));
        break;
      case "done":
        setFilteredTasks(taskList.filter((task) => task.done));
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <Card className="w-lg">
        <CardHeader className="flex gap-2 items-center">
          <Input
            placeholder="Digite sua tarefa"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="h-7"
          />
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer font-serif"
            onClick={handleAddTask}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-3" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-3 border-b">
            {taskList.length === 0 && (
              <p className="text-center text-sm">Nenhuma tarefa encontrada</p>
            )}

            {filteredTasks.map((task) => (
              <div
                className="flex justify-between items-center h-14 border-t"
                key={task.id}
              >
                <div
                  className={`${task.done ? "w-1 h-full bg-green-700" : "w-1 h-full bg-red-400"}`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-600"
                  onClick={() => handToggleTask(task.id)}
                >
                  {task.task}
                </p>

                <div className="flex items-center gap-2">
                  <EditTask task={task} handledGetTasks={handledGetTasks} />

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
              <p className="text-xs">
                Tarefas concluídas (
                {taskList.filter((task) => task.done).length}/{taskList.length})
              </p>
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
                    Tem certeza que deseja excluir as tarefas concluídas?
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={clearCompletedTasks}
                  >
                    Excluir
                  </AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancelar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-red-600 rounded-md"
              style={{
                width: `${(taskList.filter((task) => task.done).length / taskList.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-4 gap-1">
            <Sigma size={18} />
            <p className="text-xs">Total de tarefas: {taskList.length}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
