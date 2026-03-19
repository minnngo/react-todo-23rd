import { forwardRef } from "react";

const TodoInput = forwardRef(function TodoInput(
  { value, onChange, onAdd, disabled },
  ref
) {
  // form submit 시 todo 추가
  const handleSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      {/* todo 입력창 */}
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={
          disabled
            ? "주간 보기에서는 할 일을 추가할 수 없어요"
            : "할 일을 입력하세요"
        }
        className="flex-1 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-subtext)] focus:border-[var(--color-primary)] disabled:cursor-not-allowed disabled:border-[#ead9df] disabled:bg-[#f6f2f4] disabled:text-[var(--color-subtext)]"
      />

      {/* 할 일 추가 버튼 */}
      <button
        type="submit"
        disabled={disabled}
        className="rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-button)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
      >
        Add
      </button>
    </form>
  );
});

export default TodoInput;