export const EmptyView = () => {
  return (
    <section className="flex flex-col items-center text-center justify-center md:col-span-2">
      <h3 className="text-2xl font-semibold pb-1">Task List is Empty</h3>
      <p className="font-medium">
        Start by adding some tasks you want to remember.
      </p>
    </section>
  );
};
