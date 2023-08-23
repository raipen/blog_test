import { renderToString,renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Main from '../template/page/Main';
import Post from '../template/page/Post';

console.log("asdf");
const html = renderToStaticMarkup(<Main />);
console.log(html);