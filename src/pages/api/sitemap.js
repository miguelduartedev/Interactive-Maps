const handler = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>https://interactive-maps.vercel.app/</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/europe</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/north-america</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/south-america</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/africa</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/asia</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
    <url>
        <loc>https://interactive-maps.vercel.app/world</loc>
        <lastmod>2022-10-02T14:27:48+00:00</lastmod>
    </url>
  </urlset>`;

  res.end(xml);
};

export default handler;
