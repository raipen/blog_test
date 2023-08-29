import React from 'react';
import { renderToString,renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import App from '../template/App';
import fs from 'fs';

const urls = ["/", "/about"];

const html = fs.readFileSync('./build/index.html', 'utf8');

urls.forEach((url) => {
    const path = "./build" + (url=== "/" ? "" : url);
    if(!fs.existsSync(path))
        fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(path+"/index.html",
        html.replace(
            '<div id="root"></div>',
            `<div id="root">
            ${renderToString(
                <StaticRouter location={url} basename={process.env.BASE_URL}>
                    <App />
                </StaticRouter>
            )}
            </div>`
        )
    );
});
