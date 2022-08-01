import React from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  return (
    <div className="DiaryList">
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
