export default function SummaryPanel({
  totalCount,
  doneCount,
  achievementRate,
}) {
  // 통계 카드에 표시할 데이터
  const items = [
    { label: "전체 투두", value: totalCount },
    { label: "완료한 투두", value: doneCount },
    { label: "달성률", value: `${achievementRate}%` },
  ];

  return (
    <section className="mt-6 grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-white p-4 text-center shadow-[var(--shadow-card)]"
        >
          <p className="text-xs text-[var(--color-subtext)]">{item.label}</p>
          <p className="mt-2 text-xl font-bold">{item.value}</p>
        </div>
      ))}
    </section>
  );
}