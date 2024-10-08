import { Logo } from "./Logo";

type HeaderProps = {
  numberOfTasksDone: number;
  totalNumberOfTasks: number;
};

export const Header = ({
  numberOfTasksDone,
  totalNumberOfTasks
}: HeaderProps) => {
  return (
    <header className="w-full rounded-t-md bg-[#bfd39b] border-b border-b-[rgba(0,0,0,0.05)] flex justify-between items-center px-4">
      <Logo className="p-2 pl-0 md:py-1" />
      <div>
        <p>
          <span className="font-bold">{numberOfTasksDone}</span> /{" "}
          {totalNumberOfTasks} tasks done
        </p>
      </div>
    </header>
  );
};
