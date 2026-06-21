const http = require('http');

const PORT = 3000;
const TARGET_PORT = 5174; // Storefront

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers }
  };

  // Adjust host header
  if (options.headers.host) {
    options.headers.host = `127.0.0.1:${TARGET_PORT}`;
  }

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server listening on port ${PORT} forwarding to ${TARGET_PORT}`);
});
