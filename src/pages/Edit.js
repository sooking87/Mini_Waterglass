import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `감정 일기장-${id}번 일기 수정`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      setTargetDate(targetDiary.date);
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id, navigate]);

  return (
    <div>
      {originData && (
        <DiaryEditor
          isEdit={true}
          originData={originData}
          clickedDate={targetDate}
        />
      )}
    </div>
  );
};

export default Edit;
