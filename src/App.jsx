import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import DateNavigator from "./components/DateNavigator";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import SummaryPanel from "./components/SummaryPanel";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  formatDateKey,
  formatDisplayDate,
  formatWeeklyDisplay,
  getWeekDates,
} from "./utils/date";
import {
  createTodo,
  getTodosByDateKey,
  getWeeklyTodoGroups,
} from "./utils/todo";

export default function App() {
  // 현재 보고 있는 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

  // 보기 모드: daily / weekly
  const [viewMode, setViewMode] = useState("daily");

  // 입력창 값
  const [inputValue, setInputValue] = useState("");

  // 메뉴 열림 여부
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // localStorage와 연동된 todo 데이터
  const [todoData, setTodoData] = useLocalStorage("todoData", {});

  // todo 추가 후 다시 포커스를 주기 위한 ref
  const inputRef = useRef(null);

  const currentDateKey = formatDateKey(currentDate);
  const isWeekly = viewMode === "weekly";

  // 일간 보기용 todo 목록
  const dailyTodos = useMemo(() => {
    return getTodosByDateKey(todoData, currentDateKey).map((todo) => ({
      ...todo,
      dateKey: currentDateKey,
    }));
  }, [todoData, currentDateKey]);

  // 주간 보기용 날짜별 그룹
  const weeklyTodoGroups = useMemo(() => {
    const weekDates = getWeekDates(currentDate);
    return getWeeklyTodoGroups(todoData, weekDates);
  }, [todoData, currentDate]);

  // 통계 계산용 목록
  const visibleTodos = isWeekly
    ? weeklyTodoGroups.flatMap((group) => group.todos)
    : dailyTodos;

  const totalCount = visibleTodos.length;
  const doneCount = visibleTodos.filter((todo) => todo.done).length;
  const achievementRate =
    totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  // todo 추가
  const handleAddTodo = () => {
    if (isWeekly) return;

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTodo = createTodo(trimmed);

    setTodoData((prev) => ({
      ...prev,
      [currentDateKey]: [...(prev[currentDateKey] || []), newTodo],
    }));

    setInputValue("");
    inputRef.current?.focus();
  };

  // todo 완료 여부 토글
  const handleToggleTodo = (dateKey, todoId) => {
    setTodoData((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      ),
    }));
  };

  // todo 삭제
  const handleDeleteTodo = (dateKey, todoId) => {
    setTodoData((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((todo) => todo.id !== todoId),
    }));
  };

  // 이전/다음 날짜 이동
  const handleChangeDate = (offset) => {
    const nextDate = new Date(currentDate);

    if (isWeekly) {
      nextDate.setDate(nextDate.getDate() + offset * 7);
    } else {
      nextDate.setDate(nextDate.getDate() + offset);
    }

    setCurrentDate(nextDate);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <DateNavigator
          label={
            isWeekly
              ? formatWeeklyDisplay(currentDate)
              : formatDisplayDate(currentDate)
          }
          onPrev={() => handleChangeDate(-1)}
          onNext={() => handleChangeDate(1)}
        />

        <TodoInput
          ref={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onAdd={handleAddTodo}
          disabled={isWeekly}
        />

        <SummaryPanel
          totalCount={totalCount}
          doneCount={doneCount}
          achievementRate={achievementRate}
        />

        <TodoList
          todos={dailyTodos}
          weeklyGroups={weeklyTodoGroups}
          isWeekly={isWeekly}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </main>
  );
}