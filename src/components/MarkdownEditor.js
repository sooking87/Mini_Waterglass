import TextArea from "./TextArea";
import React from "react";

function MarkdownEditor({ content, setContent }) {
  console.log("MD");
  return (
    <section id="editor-container">
      <form>
        <TextArea content={content} setContent={setContent} />
      </form>
    </section>
  );
}

export default React.memo(MarkdownEditor);
