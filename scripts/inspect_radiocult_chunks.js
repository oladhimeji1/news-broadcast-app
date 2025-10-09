(async () => {
  const fetch = global.fetch || require('node-fetch');
  const urls = [
    'https://app.radiocult.fm/_next/static/chunks/pages/embed/player/%5BstationId%5D-f661eccf152d676d.js',
    'https://app.radiocult.fm/_next/static/chunks/pages/_app-d8aec1e4ab4b70b7.js'
  ];
  const terms = ['refwordfm', 'fetch(', 'axios(', '/api/', 'api/', 'stream', 'playlists', 'station', 'stations', '__NEXT_DATA__', 'listenUrl', 'listen_url', 'artwork'];

  for (const u of urls) {
    console.log('\n--- FETCH', u, '---');
    try {
      const r = await fetch(u);
      const txt = await r.text();
      for (const t of terms) {
        let idx = txt.indexOf(t);
        while (idx >= 0) {
          const start = Math.max(0, idx - 120);
          const end = Math.min(txt.length, idx + 120);
          console.log('\n[match] "' + t + '" at ' + idx + '\n...'+ txt.slice(start, end) + '...');
          idx = txt.indexOf(t, idx + t.length);
        }
      }
    } catch (e) {
      console.log('ERROR', e.message || e);
    }
  }
})();
