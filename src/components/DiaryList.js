import { identity } from "@fullcalendar/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const DiaryList = ({ id_emotion, url }) => {
  const navigate = useNavigate();
  return (
    <div className="DiaryList">
        <DiaryItem id_emotion={id_emotion} url={url} />
    </div>
  );
};

DiaryList.defaultProps = {
  dirayList: [],
};

export default DiaryList;
