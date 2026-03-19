import { formatDateKey, formatShortDateLabel } from "./date";

// 새로운 todo 객체 생성
export function createTodo(text) {
  return {
    id: crypto.randomUUID(),
    text,
    done: false,
  };
}

// 특정 날짜의 todo 목록 반환
export function getTodosByDateKey(todoData, dateKey) {
  return todoData[dateKey] || [];
}

// 주간 보기에서 날짜별 todo 그룹 생성
export function getWeeklyTodoGroups(todoData, weekDates) {
  return weekDates
    .map((date) => {
      const dateKey = formatDateKey(date);
      const todos = todoData[dateKey] || [];

      return {
        dateKey,
        dateLabel: formatShortDateLabel(date),
        todos: todos.map((todo) => ({
          ...todo,
          dateKey,
        })),
      };
    })
    .filter((group) => group.todos.length > 0);
}