export default async function handler(req, res) {
    const { id } = req.query;
  
    if (id) {
      console.log(`📩 Email opened by: ${id} at ${new Date().toISOString()}`);
      // Optionally: Save to a database or call a webhook here
    } else {
      console.log(`⚠️ Pixel loaded without an ID at ${new Date().toISOString()}`);
    }
  
    // Transparent 1x1 PNG in base64
    const pixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
      'base64'
    );
  
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(pixel);
  }