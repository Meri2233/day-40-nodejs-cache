const http = require('http');
const fs = require('fs');

let counter = 0;
const server = http.createServer((req, res) => {
    let path = "./views/"
    res.setHeader('Content-Type', 'text/html');
    switch (req.url) {
        case '/':
        case "/home":
        case "products":
        case "contacts":
            path += "index.html"
            counter++;
            break;
        case '/style.css':
            res.setHeader('Content-Type', 'text/css');
            path += 'style.css'
            break;
        default:
            break;
    }
    console.log(counter);

    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            res.write("Server Error", err.message);
            res.end();
            return;
        }
        let counterUpdate = data.replace(/[<p></p>]/, counter);
        res.write(counterUpdate);
        res.end();
    })
});

server.on('error', (err) => {
    console.log('Error Occured', err.message)
})
server.on('close', () => {
    console.log("SERVER shutting down");
})

const Port = 7000;
server.listen(Port, () => {
    console.log("SERVER is running on http://localhost:" + Port)
})