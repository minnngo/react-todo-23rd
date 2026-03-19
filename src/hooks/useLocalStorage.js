import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  // 초기 렌더링 시 localStorage에 저장된 값을 먼저 읽어옴
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // value가 바뀔 때마다 localStorage에 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패 시 무시
    }
  }, [key, value]);

  return [value, setValue];
}