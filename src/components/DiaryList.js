import React from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  return (
    <div className="DiaryList">
      <div className="right_col">
        <MyButton
          type={"positive"}
          text={"+"}
          onClick={() => navigate("./new")}
        ></MyButton>
      </div>
      {diaryList.map((it) => (
        <DiaryItem key={it.id} {...it}></DiaryItem>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  dirayList: [],
};

export default DiaryList;
