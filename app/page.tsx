import { EmptyView } from "@/components/EmptyView";
import { Header } from "@/components/Header";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskListControls } from "@/components/TaskListControls";
import { TaskItem } from "@/lib/types";
import { supabase } from "@/lib/utils";

const fetchTasks = async (): Promise<TaskItem[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .order("created_at", { ascending: true })
    .returns<TaskItem[]>();

  if (!data) {
    throw new Error(error.message);
  }

  return data;
};

const Home = async () => {
  const tasks = await fetchTasks();
  const totalNumberOfTasks = tasks.length;
  const numberOfTasksDone = tasks.filter((task) => task.completed).length;

  return (
    <>
      <h1 className="hidden whitespace-nowrap font-semibold transform -translate-x-1/2 z-[-1] uppercase tracking-[0.2em] text-[rgba(0,0,0,0.05)] absolute md:block md:text-6xl lg:text-7xl xl:text-8xl md:top-[9.5%] lg:top-[9%] xl:top-[7%] left-1/2">
        Task Manager
      </h1>
      <main className="flex">
        <div className="flex flex-col mx-auto items-center justify-center pt-10 md:pt-36 w-10/12 max-w-5xl">
          <Header
            numberOfTasksDone={numberOfTasksDone}
            totalNumberOfTasks={totalNumberOfTasks}
          />
          <div className="flex flex-col md:grid md:grid-cols-3 pt-8 md:pt-0 px-4 min-h-64 w-full bg-[#fbf5ed] rounded-b-md h-[525px] md:h-[600px]">
            <TaskList tasks={tasks} />
            {tasks.length === 0 && <EmptyView />}
            <div className="hidden md:block md:col-span-1 border-l">
              <div className="flex flex-col justify-between px-4 pt-2 pb-8 h-full mb-auto">
                <TaskForm />
                <TaskListControls tasks={tasks} />
              </div>
            </div>
            <TaskListControls
              tasks={tasks}
              className="md:hidden rounded-md w-44 mt-auto"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
