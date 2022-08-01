const addEmotion = () => {
  var event = { id: 1, title: "New event", start: new Date() };
  const calendarElem = document.querySelector("#calendar");
  calendarElem.fullCalendar("renderEvent", event, true);
  //   $("#calendar").fullCalendar("renderEvent", event, true);

  return (
    <div className="addEmotion">
      <h2>addEmotion</h2>
    </div>
  );
};

export default addEmotion;
