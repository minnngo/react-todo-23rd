export default function DateNavigator({ label, onPrev, onNext }) {
  return (
    <section className="mt-7 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        className="text-lg font-bold text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
        aria-label="이전 날짜"
      >
        ◀
      </button>

      <div className="flex w-[260px] justify-center">
        <span className="inline-block min-w-[220px] text-center text-lg font-semibold text-[var(--color-text)]">
          {label}
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="text-lg font-bold text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
        aria-label="다음 날짜"
      >
        ▶
      </button>
    </section>
  );
}