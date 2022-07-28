const TextArea = ({ content, setContent }) => {
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
