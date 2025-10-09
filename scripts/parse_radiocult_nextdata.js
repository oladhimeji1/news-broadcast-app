(async()=>{
  const fetch = global.fetch || require('node-fetch');
  const url = process.argv[2] || 'https://app.radiocult.fm/embed/player/refwordfm';
  console.log('Fetching', url);
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    const m = text.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
    if (!m) {
      console.error('No __NEXT_DATA__ found in response');
      process.exit(2);
    }
    let nd;
    try {
      nd = JSON.parse(m[1]);
    } catch {
      console.error('Failed to parse __NEXT_DATA__ JSON');
      process.exit(2);
    }

    const isStationLike = (o) => {
      if (!o || typeof o !== 'object') return false;
      const k = Object.keys(o);
      return k.includes('stream') || k.includes('streamUrl') || k.includes('stream_url') || k.includes('liveStream') || k.includes('artwork') || k.includes('image') || k.includes('playlists');
    };
    const visited = new WeakSet();
    const findDeep = (obj, depth = 0) => {
      if (!obj || typeof obj !== 'object' || depth > 10) return undefined;
      if (visited.has(obj)) return undefined;
      visited.add(obj);
      if (isStationLike(obj)) return obj;
      for (const k of Object.keys(obj)) {
        try {
          const r = findDeep(obj[k], depth + 1);
          if (r) return r;
        } catch {
          // ignore
        }
      }
      return undefined;
    };

    const candidates = [nd, nd.props, nd.props?.pageProps, nd.props?.pageProps?.initialState, nd.props?.pageProps?.station];
    let stationObj;
    for (const c of candidates) {
      if (!c) continue;
      if (isStationLike(c)) {
        stationObj = c;
        break;
      }
      stationObj = findDeep(c);
      if (stationObj) break;
    }

    if (!stationObj) {
      console.error('No station-like object found inside __NEXT_DATA__');
      process.exit(2);
    }

    const parsed = {
      streamUrl: stationObj.stream || stationObj.streamUrl || stationObj.stream_url || stationObj.listenUrl || stationObj.url || null,
      title: stationObj.title || stationObj.name || stationObj.stationName || null,
      subtitle: stationObj.subtitle || stationObj.tagline || stationObj.shortDescription || null,
      image: stationObj.image || stationObj.artwork || stationObj.trackImage || (stationObj.images && stationObj.images[0]) || null,
      listeners: stationObj.listeners ? String(stationObj.listeners) : null,
      description: stationObj.description || stationObj.longDescription || null,
      playlists: stationObj.playlists || stationObj.recentPlaylists || stationObj.tracks || null,
    };

    console.log('Parsed station data:');
    console.log(JSON.stringify(parsed, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Fetch error:', err.message || err);
    process.exit(2);
  }
})();
