const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const root = __dirname;
const port = 4173;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function send(response, status, body, type = 'text/plain; charset=utf-8') {
  response.writeHead(status, { 'content-type': type });
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  if (request.url === '/api/positions' && request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', async () => {
      try {
        const upstream = await fetch('https://liquidity.backend-prod.api.uniswap.org/uniswap.liquidity.v2.LiquidityService/GetPosition', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body
        });
        const result = await upstream.text();
        send(response, upstream.status, result, 'application/json; charset=utf-8');
      } catch (error) {
        send(response, 502, JSON.stringify({ error: error.message }), 'application/json; charset=utf-8');
      }
    });
    return;
  }

  const requested = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(root, requested.split('?')[0]);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) return send(response, 404, 'Not found');
  send(response, 200, fs.readFileSync(filePath), mime[path.extname(filePath)] || 'application/octet-stream');
});

server.listen(port, '127.0.0.1', () => {
  const url = `http://localhost:${port}`;
  console.log(`Robinhood LP Scanner: ${url}`);
  exec(`start "" "${url}"`);
});
