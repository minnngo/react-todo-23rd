export default function ViewMenu({ viewMode, onSelect }) {
  return (
    <div className="absolute right-0 top-14 z-10 w-40 rounded-2xl border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-card)]">
      {/* 일간 보기 버튼 */}
      <button
        type="button"
        onClick={() => onSelect("daily")}
        className={`mb-2 w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
          viewMode === "daily"
            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
            : "hover:bg-[var(--color-bg-soft)]"
        }`}
      >
        Daily
      </button>

      {/* 주간 보기 버튼 */}
      <button
        type="button"
        onClick={() => onSelect("weekly")}
        className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
          viewMode === "weekly"
            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
            : "hover:bg-[var(--color-bg-soft)]"
        }`}
      >
        Weekly
      </button>
    </div>
  );
}