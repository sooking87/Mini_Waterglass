import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";
// value Prop: 어떤 종류의 select를 골랐는지
// onChange Prop: select가 정의한 값이 바뀌었을 때 기능하는 함수
// option Prop: select 태그 안에 들어있는 리스트
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
const filterOptionList = [
  { value: "all", name: "모두다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getFilterCallBack = (item) => {
    if (filter === "good") {
      return parseInt(item.emotion) <= 3;
    } else {
      return parseInt(item.emotion) > 3;
    }
  };

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it) => getFilterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          ></ControlMenu>
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          ></ControlMenu>
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("./new")}
          ></MyButton>
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it}></DiaryItem>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  dirayList: [],
};

export default DiaryList;
