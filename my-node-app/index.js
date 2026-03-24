const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.on('listening', () => {
    console.log(`Server is running on port: ${port}`);
});

server.listen(port);