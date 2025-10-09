(async () => {
  const fetch = global.fetch || require('node-fetch');
  const embedUrl = process.argv[2] || 'https://app.radiocult.fm/embed/player/refwordfm';
  console.log('Fetching', embedUrl);
  try {
    const res = await fetch(embedUrl);
    const html = await res.text();
    const scriptSrcs = Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi)).map(m => m[1]);
    console.log('Found', scriptSrcs.length, 'script src(s)');
    const keywords = ['refwordfm', 'station', 'stations', 'api', 'stream', 'playlists', 'playback', 'listen', 'track', 'artwork'];
    for (const s of scriptSrcs) {
      let url = s;
      if (!url.startsWith('http')) {
        if (url.startsWith('/')) url = 'https://app.radiocult.fm' + url;
        else url = 'https://app.radiocult.fm/' + url;
      }
      try {
        const r = await fetch(url);
        const txt = await r.text();
        const found = keywords.filter(k => txt.includes(k));
        if (found.length) {
          console.log('\n--', url, 'matches:', found.join(', '), '(len', txt.length + ')');
        } else {
          console.log('\n--', url, 'no keywords (len', txt.length + ')');
        }
      } catch (e) {
        console.log('ERR fetching', url, e.message || e);
      }
    }
  } catch (err) {
    console.error('Fetch error', err.message || err);
    process.exit(2);
  }
})();
