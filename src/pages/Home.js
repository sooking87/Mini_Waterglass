import React, { useContext, useEffect, useState, useMemo } from "react";

// cal modules
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //기본 달력을 그리기 위한 플러그인 - 설치해야함!
import interactionPlugin from "@fullcalendar/interaction"; //이벤트,클릭,드래그 등의 기능을 이용하기 위한 플러그인
import { useNavigate, useParams } from "react-router-dom";
import DiaryList from "../components/DiaryList";
import DiaryItem from "../components/DiaryItem";
import { DiaryStateContext } from "../App";

const Home = () => {
  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `감정 일기장`;
  }, []);

  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  // title에 해당하는 월에 맞게 필터링
  // // 해당 달에 작성된 일기만 추리기 위한 코드
  // useEffect(() => {
  //   if (diaryList.length >= 1) {
  //     const [year, month, day] = diaryList[0].date.split("-");
  //     const firstDay = new Date(year, month - 1, 1).getTime();
  //     const lastDay = new Date(year, month - 1, 0, 23, 59, 59).getTime();

  //     setData(
  //       diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
  //     );
  //   }
  // }, [diaryList]);

  /* for handle fc cell Height */
  useEffect(function setCalendarEventHeightHack() {
    // a bit unsafe: I'm just grabbing the table via a class name
    const calendarElement = document.getElementsByClassName(
      "fc-scrollgrid-sync-table"
    )[0];

    if (calendarElement.tagName === "TABLE") {
      const trElements = calendarElement.getElementsByClassName(
        "fc-daygrid-day-events"
      );

      for (let i = 0; i < trElements.length; i++) {
        const tr = trElements[i];

        tr.style.height = "10vh";
      }
    }
  }, []);

  // DiaryList에 일기가 존재하는지 아닌지 판별하는 함수
  const isUnion = (dateClickInfo) => {
    let isDif = true;
    diaryList.map((it) => {
      if (it.date === dateClickInfo.dateStr) {
        isDif = false;
      }
    });
    if (isDif) {
      return true;
    } else {
      return false;
    }
  };

  /* for FullCalendar events List */
  const getEventList = useMemo(() => {
    let eventList = [];
    for (var key of diaryList) {
      const obj = {
        title: "",
        start: key.date,
        allDay: false,
        url: `assets/emotion${key.emotion}.png`,
      };
      eventList = [obj, ...eventList];
    }
    console.log("Home getEventList", eventList);
    return eventList;
  }, [diaryList]);

  const goDetail = () => {
    navigate(`/diary/1`);
  };

  // DiaryList 컴포넌트로 diaryList 데이터 넘겨주기
  const renderEventContent = (eventInfo) => {
    console.log(eventInfo.classNames);
    return (
      <div className="DiaryItem">
        <div
          onClick={goDetail}
          className={[
            "emotion_img_wrapper",
            `emotion_img_wrapper_${eventInfo.event.url}`,
          ].join(" ")}
        >
          <img
            src={eventInfo.event.url}
            onClick={goDetail}
            alt=""
            width="auto"
          />
        </div>
        {/* <div>
          <DiaryItem eventInfo={eventInfo} />
        </div> */}
      </div>
    );
  };

  return (
    <div className="Home">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable="true" //이벤트,드래그 등의 편집 기능 활용여부
        height="90vw"
        width="100vw"
        dayMaxEvents="1"
        dateClick={(dateClickInfo) => {
          // 데이터가 있다면 Diary 보여주기, 아니라면 new로 가기
          if (isUnion(dateClickInfo)) {
            navigate(`./new/${dateClickInfo.dateStr}`);
          }
        }}
        events={getEventList}
        eventContent={renderEventContent} //이벤트 내용 커스텀
        headerToolbar={{
          //헤드 툴바
          start: "prev",
          center: "title",
          end: `next`,
        }}
      />
    </div>
  );
};

DiaryList.defaultProps = {
  dirayList: [],
};

export default Home;
