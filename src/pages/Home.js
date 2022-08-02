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
  const [change, setChange] = useState();
  console.log(change);

  /* for notice prev, next button clicked */
  useEffect(() => {
    const prevBtn = document.querySelectorAll(".fc-toolbar-chunk");
    prevBtn.forEach((btn) =>
      btn.addEventListener("click", (e) => setChange(e))
    );
  }, []);

  /* for handle fc cell Height */
  useEffect(() => {
    console.log("change or diaryList.lenght changed");
    // a bit unsafe: I'm just grabbing the table via a class name
    const calendarElement = document.getElementsByClassName(
      "fc-scrollgrid-sync-table"
    )[0];

    if (calendarElement.tagName === "TABLE") {
      // cell 크기 고정
      const trElements = calendarElement.getElementsByClassName(
        "fc-daygrid-day-events"
      );
      for (let i = 0; i < trElements.length; i++) {
        const tr = trElements[i];

        tr.style.height = "10vh";
      }
    }
  }, [change, diaryList.length]);

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

  /* 선택적 Mouse Over 기능 */

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
            console.log("추가 가능");
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
