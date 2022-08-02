import { useNavigate } from "react-router-dom";
import React from "react";
import MyButton from "./MyButton";

const DiaryItem = ({ id_emotion, url }) => {
  const navigate = useNavigate();
  const [id, emotion] = id_emotion.split(" ");
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={"DiaryItem"}>
      <div
        onClick={() => 
          navigate(`/diary/${id}`)
        }
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + url}
          alt=""
        />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
