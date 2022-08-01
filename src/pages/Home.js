import React, { useContext, useEffect, useState } from "react";

// cal modules
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; //기본 달력을 그리기 위한 플러그인 - 설치해야함!
import interactionPlugin from "@fullcalendar/interaction"; //이벤트,클릭,드래그 등의 기능을 이용하기 위한 플러그인
import { useNavigate } from "react-router-dom";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../App";

// 데이터 불러오기
const testFunc = (clickedDate) => {
  console.log("testFunc", clickedDate);
  return (
    <h2>{clickedDate}</h2>
  )
}

const Home = () => {
  // 페이지 별 타이틀 수정하기
  useEffect(() => {
    const titleElem = document.getElementsByTagName("title")[0];
    titleElem.innerHTML = `감정 일기장`;
  }, []);

  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  // 현재 월에 해당하는 일기만 필요하므로 useState 사용
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  

  const renderEventContent = (eventInfo, diaryList) => {
    //+버튼 화면에 출력
    if (diaryList) {
      return (
        <div>
          <img
            className="event_image"
            src="/assets/addDiary.png"
            onClick={() => navigate(`/new`)}
            width="85"
            height="85"
          />
        </div>
      );
    }
  };
  const handleDateClick = (dateClickInfo, key, parent) => {
    // const fcDayElements = document.querySelectorAll(".fc-daygrid-day.fc-day");
    // console.log(fcDayElements);

    // fcDayElements.forEach((element, key, parent) = {
    //   element.style.backgroundColor = "";
    // });
    // dateClickInfo.dayEl.style.backgroundColor = "#787878";
  };

  const handleEventClick = ({ event }) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    this.props.openAppointment(event.extendedProps);
  };

  

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable="true" //이벤트,드래그 등의 편집 기능 활용여부
      height="850px"
      width="100vw"
      eventContent={renderEventContent} //이벤트 내용 커스텀
      dateClick={(dateClickInfo) => {
        console.log(dateClickInfo);
        console.log(Object.keys(dateClickInfo).includes('DiaryItem'));
        const clickedDate = dateClickInfo.dateStr;
        if (!Object.keys(dateClickInfo).includes('DiaryItem')) {
          console.log("처음 클릭");
          // navigate('/new');
        }
        else {
          console.log("DiaryItem 있음")
        }
        // get all fc-day element
        const fcDayElements = document.querySelectorAll(
          ".fc-daygrid-day.fc-day"
        );
        // init background color found element
        fcDayElements.forEach((element, key, parent) => {
          element.style.backgroundColor = "";
          const elemDate = element.getAttribute('data-date');
          if (clickedDate === elemDate) {
            console.log(clickedDate, elemDate, "클릭한 날짜랑 같음");
            testFunc(clickedDate);
          }
        });
        // set background color clicked Element
        
        dateClickInfo.dayEl.style.backgroundColor = "#787878";
      }}
      headerToolbar={{
        //헤드 툴바
        start: "prev",
        center: "title",
        end: `next`,
      }}
    />
  );
};

export default Home;
// [
//   {
//     title: "event1",
//     start: "2022-08-08",
//   },
//   {
//     title: "event2",
//     start: "2022-08-05",
//     end: "2022-08-07",
//   },
//   {
//     title: "event3",
//     start: "2022-08-09",
//     allDay: false, // will make the time show
//   },
// ]
