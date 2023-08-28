import React from 'react';
import { renderToString,renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import App from '../template/App';
import fs from 'fs';

const urls = ["/", "/about"];

const html = fs.readFileSync('./build/index.html', 'utf8');

fs.mkdirSync("./build", { recursive: true });

urls.forEach((url) => {
    fs.writeFileSync("./build" + (url=== "/" ? "/index" : url) + ".html",
        html.replace(
            '<div id="root"></div>',
            `<div id="root">
            ${renderToString(
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            )}
            </div>`
        )
    );
});
