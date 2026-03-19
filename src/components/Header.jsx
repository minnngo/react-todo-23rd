import { useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import ViewMenu from "./ViewMenu";

export default function Header({
  viewMode,
  setViewMode,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <header className="relative flex items-center justify-between" ref={menuRef}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
      </div>

      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-[92px] rounded-2xl border border-[var(--color-border)] bg-white px-4 py-2 text-center text-sm font-medium text-[var(--color-text)] shadow-[var(--shadow-button)] transition hover:-translate-y-0.5"
      >
        {viewMode === "daily" ? "Daily" : "Weekly"}
      </button>

      {isMenuOpen && (
        <ViewMenu
          viewMode={viewMode}
          onSelect={(mode) => {
            setViewMode(mode);
            setIsMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}