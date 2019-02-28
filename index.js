const fs = require('fs');
const port = 33080;
var util = require('util');

const listener = (req, res) => {
    const path = req.url.replace(/\?.*$/, '');
	var param = { };
	const query_string = req.url.match(/^.+\?(.*)$/);
	if(query_string) {
		query_string[1].split(/&/).forEach(kv => {
			((k, v) => { param[k] = decodeURIComponent(v); }).apply(null, kv.split(/=/))
	  });
	}

    if(path.indexOf('/otameshi/') == 0 && req.method === 'GET') {
        console.log('GET');
        console.log('param = %s', param['otameshitext']);
        fs.readFile('./htdocs/otameshi/index.html', 'utf-8', function (error, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });
        return;
    }

    if(path.indexOf('/otameshi/') == 0 && req.method === 'POST') {
        console.log('POST');
        const querystring = require('querystring');

        var data = '';
        req.on('readable', function(chunk) {
            var chunk = req.read();
            if(chunk != null) {
                data += chunk;
            }
        });
        req.on('end', function() {
            const param = querystring.parse(data);
            console.log(data);
        });

        fs.readFile('./htdocs/otameshi/index.html', 'utf-8', function (error, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });
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
