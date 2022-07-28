import { useEffect, useRef } from "react";

const TextArea = ({ content, setContent }) => {
  const contentRef = useRef();

  useEffect(() => {
    console.log("TextArea", content.length);
    if (content.length < 1) {
      contentRef.current.focus();
    }
  }, [content.length]);

  return (
    <textarea
      placeholder="오늘은 어땠나요?"
      id="editor"
      value={content}
      ref={contentRef}
      onChange={(e) => {
        setContent(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;
