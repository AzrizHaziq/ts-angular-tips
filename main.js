import './index.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/blood.css';
import 'reveal.js/plugin/highlight/zenburn.css';

import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import HighLight from 'reveal.js/plugin/highlight/highlight.esm';

import './1-js.md';
import './2-angular.md';
import './3-other.md';
import './4-prettier.md';

let deck = new Reveal({
  controls: true,
  progress: true,
  history: true,
  slideNumber: true,
  plugins: [Markdown, HighLight, Notes],
  markdown: {
    smartypants: true
  }
});

deck.initialize();
