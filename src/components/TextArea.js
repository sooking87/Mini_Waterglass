import { useRef } from "react";

const TextArea = ({content, setContent}) => {
  const contentRef = useRef();

//   if (content.length < 1) {
//       contentRef.current.focus();
//       return;
//     }

  return (
    <textarea
      placeholder="오늘은 어땠나요?"
      id='editor'
      ref={contentRef}
      value={content}
      onChange={(e) => setContent(
            e.target.value
        )}>
    </textarea>
  )
}

export default TextArea;