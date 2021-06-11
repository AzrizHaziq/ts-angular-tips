import './index.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/blood.css';
import 'reveal.js/plugin/highlight/zenburn.css';

import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import HighLight from 'reveal.js/plugin/highlight/highlight.esm';

import * as md from './example.md';

let deck = new Reveal({
  controls: true,
  progress: true,
  history: true,
  // center: true,
  slideNumber: true,
  plugins: [Markdown, HighLight, Notes],
  markdown: {
    smartypants: true
  }
});

deck.initialize();
