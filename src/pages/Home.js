import React, { useContext, useEffect, useState, useMemo } from "react";

// cal modules
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //기본 달력을 그리기 위한 플러그인 - 설치해야함!
import interactionPlugin from "@fullcalendar/interaction"; //이벤트,클릭,드래그 등의 기능을 이용하기 위한 플러그인
import { useNavigate } from "react-router-dom";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

const Home = () => {
  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `감정 일기장`;
  }, []);

  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  /* DiaryList에 일기가 존재하는지 아닌지 판별하는 함수 */
  const isUnion = (dateClickInfo) => {
    let isDif = true;
    diaryList.forEach((it) => {
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
        title: key.id + " " + key.emotion,
        start: key.date,
        allDay: false,
      };
      eventList = [obj, ...eventList];
    }
    return eventList;
  }, [diaryList]);

  /* DiaryList 컴포넌트로 diaryList에 eventInfo 넘겨주기 */
  const renderEventContent = (eventInfo) => {
    return <DiaryList id_emotion={eventInfo.event.title}></DiaryList>;
  };

  return (
    <div className="Home">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable="false" //이벤트,드래그 등의 편집 기능 활용여부
        height="90vh"
        width="100vh"
        dayMaxEvents="1"
        dateClick={(dateClickInfo) => {
          if (isUnion(dateClickInfo)) {
            navigate(`./new/${dateClickInfo.dateStr}`);
          }
        }}
        eventMouseEnter={(mouseEnterInfo) => {
          mouseEnterInfo.el.style.cssText =
            "transform:scaleX(1.2) scaleY(1.2) ;"
           mouseEnterInfo.el.style.transition="1s";;
        }}
        eventMouseLeave={(mouseLeaveInfo) => {
          mouseLeaveInfo.el.style.cssText = "transform:scale(1.0);"
          mouseLeaveInfo.el.style.transition="1s";;
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
