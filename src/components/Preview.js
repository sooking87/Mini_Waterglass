
import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
// Markdown It Plugins
import markdownitEmoji from 'markdown-it-emoji';
import markdownitSub from 'markdown-it-sub';
import markdownitSup from 'markdown-it-sup';
import markdownitIns from 'markdown-it-ins';
import markdownitMark from 'markdown-it-mark';
import markdownitFootnote from 'markdown-it-footnote';
import markdownitAbbr from 'markdown-it-abbr';
import markdownitDeflist from 'markdown-it-deflist';
import markdownitContainer from 'markdown-it-container';
import highlightJs from 'highlight.js';

function Preview({content}) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && highlightJs.getLanguage(lang)) {
        try {
          return highlightJs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return '';
    }
  })
    .use(markdownitEmoji)
    .use(markdownitSub)
    .use(markdownitSup)
    .use(markdownitIns)
    .use(markdownitMark)
    .use(markdownitFootnote)
    .use(markdownitAbbr)
    .use(markdownitDeflist)
    .use(markdownitContainer, 'error');
  const markedText = md.render(content);

  return (
    <section id='preview-container'>
      <article
        id='preview'
        dangerouslySetInnerHTML={{__html: markedText}} >
      </article>
    </section>
  )
}

export default Preview;