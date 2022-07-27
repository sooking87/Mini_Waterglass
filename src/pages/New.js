import DiaryEditor from "../components/DiaryEditor";
import React, {useEffect} from "react";

const New = () => {
  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName('title')[0];
    titleElem.innerHTML = `새 일기`
  }, [])

  return (
    <div>
      <DiaryEditor></DiaryEditor>
    </div>
  );
};

export default New;
