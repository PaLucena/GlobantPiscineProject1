const	http = require('http');
const	fs = require('fs');
const	path = require('path');

//const	loginPage = fs.readFileSync('./login/login.html');
//const	loginStyles = fs.readFileSync('./login/loginStyles.css');
//const	loginLogic = require('./login/loginScript.js');

const	server = http.createServer(async (req, res) => {
	const	envVars = await getEnvVars();

	if (req.url === '/') {
		fs.readFile(path.join(__dirname, 'login/login.html'), (err, content) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal server error');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/loginStyles.css') {
		fs.readFile(path.join(__dirname, 'login/loginStyles.css'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('CSS not found');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'text/css' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/loginScript.js') {
		fs.readFile(path.join(__dirname, 'login/loginScript.js'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('JavaScript not found');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'application/javascript' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/gallery') {
		fs.readFile(path.join(__dirname, 'home/index.html'), (err, content) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal server error');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/homeStyles.css') {
		fs.readFile(path.join(__dirname, 'home/homeStyles.css'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('CSS not found');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'text/css' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/homeScript.js') {
		fs.readFile(path.join(__dirname, 'home/homeScript.js'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('JavaScript not found');
			}
			else {
				res.writeHead(200, { 'Content-Type': 'application/javascript' });
				res.end(content);
			}
		});
	}
	else if (req.url === "/api/envVars") {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(envVars);
	}
	else {
		res.writeHead(404, {'content-type': 'text/html'});
		res.write('<h1>404, Resource Not Found</h1> <a href="/">Go back</a>');
		res.end();
	}
})

server.listen(5000, () => {
	console.log('Server listening at port 5000');
})

function	getEnvVars() {
	const	envPath = path.resolve(__dirname, '.env');

	return new Promise((resolve, reject) => {
		fs.readFile(envPath, 'utf-8', (err, data) => {
			if (err) {
				console.error('Error at reading .env file:', err);
			}

			const	envVars = data.split('\n').reduce((acc, line) => {
				if (line && !line.startsWith('#')) {
					const	[key, value] = line.split('=');
					acc[key.trim()] = value.trim();
				}
				return acc
			}, {});

			resolve (JSON.stringify(envVars))
		});
	});
}
