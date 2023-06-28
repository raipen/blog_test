import { renderToString } from 'react-dom/server';
import React from 'react';
import Main from '../template/page/Main';
import Post from '../template/page/Post';

console.log("asdf");
const html = renderToString(<Main />);
console.log(html);