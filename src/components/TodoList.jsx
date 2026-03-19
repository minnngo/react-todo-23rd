import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  weeklyGroups,
  isWeekly,
  onToggle,
  onDelete,
}) {
  if (isWeekly) {
    if (weeklyGroups.length === 0) {
      return (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center text-sm text-[var(--color-subtext)] shadow-[var(--shadow-card)]">
          등록된 할 일이 없어요.
        </div>
      );
    }

    return (
      <div className="mt-6 space-y-4">
        {weeklyGroups.map((group) => (
          <section
            key={group.dateKey}
            className="rounded-3xl bg-[#ffe8f0] p-5 shadow-[var(--shadow-card)]"
          >
            <h3 className="mb-4 text-sm font-medium text-[var(--color-subtext)]">
              {group.dateLabel}
            </h3>

            <ul className="space-y-3">
              {group.todos.map((todo) => (
                <TodoItem
                  key={`${todo.dateKey}-${todo.id}`}
                  todo={todo}
                  onToggle={() => onToggle(todo.dateKey, todo.id)}
                  onDelete={() => onDelete(todo.dateKey, todo.id)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="mt-6 rounded-2xl bg-white p-6 text-center text-sm text-[var(--color-subtext)] shadow-[var(--shadow-card)]">
        등록된 할 일이 없어요.
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={`${todo.dateKey}-${todo.id}`}
          todo={todo}
          onToggle={() => onToggle(todo.dateKey, todo.id)}
          onDelete={() => onDelete(todo.dateKey, todo.id)}
        />
      ))}
    </ul>
  );
}