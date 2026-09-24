export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const binanceUrl = `https://api.binance.com${url.pathname.replace('/api/proxy', '')}${url.search}`;

  try {
    const response = await fetch(binanceUrl, {
      method: req.method,
      headers: {
        'X-MBX-APIKEY': req.headers['x-mbx-apikey'] || '',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy Error' });
  }
}
