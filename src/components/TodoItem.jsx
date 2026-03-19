export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-button)]">
      <div className="flex items-center justify-between gap-3">
        {/* 체크박스 + todo 텍스트 */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={todo.done ? "완료 해제" : "완료 표시"}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border transition ${
              todo.done
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                : "border-gray-400 bg-white"
            }`}
          >
            {todo.done && (
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <p
            className={`break-words text-sm ${
              todo.done ? "text-gray-400 line-through" : "text-[var(--color-text)]"
            }`}
          >
            {todo.text}
          </p>
        </div>

        {/* x 삭제 버튼 */}
        <button
          type="button"
          onClick={onDelete}
          aria-label="투두 삭제"
          className="shrink-0 text-xl font-semibold leading-none text-[var(--color-subtext)] transition hover:text-[var(--color-primary)]"
        >
          ×
        </button>
      </div>
    </li>
  );
}