const fs = require('fs');
const port = 33080;

const listener = (req, res) => {
    const path = req.url.replace(/\?.*$/, '');

    if(path.indexOf('/otameshi/') == 0) {
        console.log(path)
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write('hello world');
        res.end();
        return;
    }

    console.log("-> Not Found");
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found!');
    res.end();
    return;
}
console.log('Listening on :'+port);
require('http').createServer(listener)
.listen(port, '0.0.0.0');
