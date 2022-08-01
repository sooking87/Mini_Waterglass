import { useNavigate } from "react-router-dom";
import React from "react";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={"DiaryItem"}>
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
