import { useNavigate } from "react-router-dom";
import React from "react";

const DiaryItem = ({ id_emotion }) => {
  const navigate = useNavigate();
  const [id, emotion] = id_emotion.split(" ");

  return (
    <div className={"DiaryItem"}>
      <div
        onClick={() => navigate(`/diary/${id}`)}
        className={[
          "fc-daygrid-event",
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `./assets/emotion${emotion}.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
