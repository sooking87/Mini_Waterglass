import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect, useCallback } from "react";
// components
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App.js";
import { emotionList } from "./../util/emotionList";
import MarkdownEditor from "./MarkdownEditor";
import Preview from "./Preview";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const editor = document.querySelector(".editor");

  const handleSubmit = () => {
    if (content.length < 1) {
      editor.classList.add("alertBlank");
      editor.addEventListener("click", function () {
        editor.classList.remove("alertBlank");
      });

      return;
    }

    if (
      window.confirm(
        isEdit
          ? "일기를 수정하시겠습니까? "
          : "새로운 일기를 작성하시겠습니까? "
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  const handleClickRemote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    } else {
      setDate(getStringDate(new Date()));
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로 가기"}
            onClick={() => navigate(-1)}
          ></MyButton>
        }
        rightChild={
          isEdit && (
            <MyButton
              type={"negative"}
              text={"삭제하기"}
              onClick={handleRemove}
            ></MyButton>
          )
        }
      ></MyHeader>
      <div>
        <section>
          <h4 className="title">오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4 className="title">오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickRemote}
                isSelected={it.emotion_id === emotion}
              ></EmotionItem>
            ))}
          </div>
        </section>
        <section>
          <div className="text_wrapper">
            <div>
              <h4 className="title">오늘의 일기</h4>
              <div className="input_box text_wrapper">
                <MarkdownEditor
                  content={content}
                  setContent={setContent}
                ></MarkdownEditor>
              </div>
            </div>
            <div>
              <h4 className="title">Preview</h4>
              <div className="output_box markdown_wrapper">
                <Preview content={content}></Preview>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)}></MyButton>
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            ></MyButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
