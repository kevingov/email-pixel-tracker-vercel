// Minimal Vercel Serverless Function (CommonJS) – works out of the box

const pixel = Buffer.from(
  // 1x1 transparent PNG, base64
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
  'base64'
);

module.exports = (req, res) => {
  try {
    const id = (req.query && req.query.id) || 'unknown';

    // Log the open (view logs in Vercel -> Project -> Functions)
    console.log(`📩 Opened: ${id} @ ${new Date().toISOString()}`);

    // Some clients prefetch with HEAD
    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      return res.end();
    }

    // Normal GET response with the transparent pixel
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return res.end(pixel);
  } catch (err) {
    console.error('Pixel error:', err);
    res.statusCode = 500;
    return res.end('error');
  }
};