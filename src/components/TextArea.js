const TextArea = ({ content, setContent }) => {
  console.log("TextArea");
  return (
    <textarea
      placeholder="오늘은 어땠나요?"
      className="editor"
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;
