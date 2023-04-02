const http = require('http');
const PORT = 8000;

const fs = require('fs');
const path = require('path');
const url = require('url');

const publicPath = '../public'; 

const routes = {
    "/": "index.html",
    "/cari-mobil": "index.example.html"
}

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
};


function onRequest(req, res){
    const parsedUrl = url.parse(req.url);
    console.log(parsedUrl);
    let pathUrl = parsedUrl.pathname

    if (routes.hasOwnProperty(pathUrl)) pathUrl = routes[pathUrl];

    const sanitizePath = path.normalize(pathUrl).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, publicPath, sanitizePath);

    fs.exists(pathname, function (exist) {
        if (!exist) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }

        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                const ext = path.parse(pathname).ext;
                console.log(ext);
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
   
}

const server = http.createServer(onRequest);

server.listen(PORT, '0.0.0.0', ()=>{
    console.log("Server sudah berjalan, silahkan dibuka http://127.0.0.1:%d", PORT);
})


const express = require('express');
const app = express();
const port = 8000;
const path = require('path')

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('/', (req, res)=>{
    res.status(200);
    res.sendFile(path.join(publicDir,'index.html'))
})

app.get('/cars', (req, res)=>{
    res.status(200);
    res.sendFile(path.join(publicDir,'index.example.html'))
})

app.listen(port,()=>{
    console.log("Server sudah jalan..");
})