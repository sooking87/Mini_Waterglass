import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ id_emotion }) => {
  return (
    <div className="DiaryList">
      <DiaryItem id_emotion={id_emotion} />
    </div>
  );
};

DiaryList.defaultProps = {
  dirayList: [],
};

export default DiaryList;
