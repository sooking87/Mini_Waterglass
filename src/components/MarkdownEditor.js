import TextArea from './TextArea'

function MarkdownEditor({content, setContent}) {
  

  return (
    <section id='editor-container'>  
      <form>
        <TextArea content={content} setContent={setContent}/>
      </form>
    </section>
  )
}

export default MarkdownEditor;