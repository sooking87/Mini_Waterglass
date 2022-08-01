import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { emotionList } from "../util/emotionList";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import Preview from "../components/Preview";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setDate] = useState();

  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `감정 일기장-${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setDate(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다,,,</div>;
  } else {
    const date = getStringDate(new Date(data.date));
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${date} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정 / 삭제하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        ></MyHeader>
        <article className="diary_img_content">
          <section>
            <h4 className="title">오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4 className="title">오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <Preview content={data.content}></Preview>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
