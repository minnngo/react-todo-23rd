import { useEffect } from "react";

export function useOutsideClick(ref, handler) {
  useEffect(() => {
    // ref 바깥 영역을 클릭했는지 확인하는 함수
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };

    // 마우스/터치 이벤트 등록
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}