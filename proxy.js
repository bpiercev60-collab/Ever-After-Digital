const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const STOREFRONT_PORT = 5174;
const EDITOR_PORT = 5173;

function proxyRequest(targetPort, targetPath, req, res, maxRedirects = 3) {
  if (maxRedirects <= 0) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Too many redirects');
    return;
  }

  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: targetPath,
    method: req.method,
    headers: { ...req.headers }
  };

  if (options.headers.host) {
    options.headers.host = `127.0.0.1:${targetPort}`;
  }

  const proxyReq = http.request(options, (proxyRes) => {
    const statusCode = proxyRes.statusCode;
    const location = proxyRes.headers['location'];

    // Follow redirects internally
    if ((statusCode === 301 || statusCode === 302 || statusCode === 307 || statusCode === 308) && location) {
      const resolvedUrl = new URL(location, `http://127.0.0.1:${targetPort}`);
      const newPath = resolvedUrl.pathname + resolvedUrl.search;
      proxyRequest(targetPort, newPath, req, res, maxRedirects - 1);
      return;
    }

    const headers = { ...proxyRes.headers };
    delete headers['location'];
    res.writeHead(statusCode, headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error(`Proxy error -> port ${targetPort}:`, err.message);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway: ' + err.message);
  });

  req.pipe(proxyReq, { end: true });
}

function serveSharedData(url, res) {
  const isTemplates = url === '/shared-data/templates.json';
  const isBranding = url === '/shared-data/branding.json';
  let filePath;

  if (isTemplates) {
    filePath = '/home/team/shared/templates/templates.json';
  } else if (isBranding) {
    filePath = '/home/team/shared/branding/branding.json';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load data' }));
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url;

  // Serve shared data directly from filesystem
  if (url.startsWith('/shared-data')) {
    serveSharedData(url, res);
    return;
  }

  // Route /editor/* to the customizer (Vite already has base: '/editor/')
  if (url.startsWith('/editor')) {
    proxyRequest(EDITOR_PORT, url, req, res);
    return;
  }

  // Everything else goes to the storefront
  proxyRequest(STOREFRONT_PORT, url, req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server listening on http://0.0.0.0:${PORT}`);
  console.log(`  /shared-data -> served directly from filesystem`);
  console.log(`  /editor      -> Customization Engine (port ${EDITOR_PORT})`);
  console.log(`  everything else -> Storefront (port ${STOREFRONT_PORT})`);
});