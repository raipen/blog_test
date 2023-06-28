const renderToString = require('react-dom/server').renderToString;
const React = require('react');
const Main = require('../template/page/Main').default;
const Post = require('../template/page/Post').default;

console.log("asdf");
const html = renderToString(<Main />);
console.log(html);