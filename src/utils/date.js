// Date 객체를 localStorage key로 쓰기 좋은 yyyy-mm-dd 형식으로 변환
export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 일간 보기에서 사용할 날짜 표시 형식
export function formatDisplayDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

// 주간 보기에서 각 todo 위에 표시할 짧은 날짜 라벨
export function formatShortDateLabel(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return `${month}월 ${day}일 (${dayNames[date.getDay()]})`;
}

// 현재 날짜가 포함된 주의 월요일~일요일 날짜 배열 반환
export function getWeekDates(date) {
  const target = new Date(date);
  const day = target.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  const monday = new Date(target);
  monday.setDate(target.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + index);
    return current;
  });
}

// 주간 보기 상단에 표시할 주 범위 문자열 생성
export function formatWeeklyDisplay(date) {
  const weekDates = getWeekDates(date);
  const start = weekDates[0];
  const end = weekDates[6];

  return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${
    end.getMonth() + 1
  }월 ${end.getDate()}일`;
}