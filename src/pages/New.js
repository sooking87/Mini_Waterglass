import DiaryEditor from "../components/DiaryEditor";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const New = () => {
  const { date } = useParams();
  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor clickedDate={date}></DiaryEditor>
    </div>
  );
};

export default React.memo(New);
