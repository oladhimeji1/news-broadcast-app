(async()=>{
  const fetch = global.fetch || require('node-fetch');
  const station = process.argv[2] || 'refwordfm';
  const url = `https://api.radiocult.fm/api/station/${station}`;
  console.log('Fetching', url);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    console.log('status', res.status, 'content-type', res.headers.get('content-type'));
    const json = await res.json();
    const s = json.station || json;
    const firstChannel = Array.isArray(s?.channels) && s.channels.length ? s.channels[0] : undefined;
    const mapped = {
      streamUrl: firstChannel?.stream_url || firstChannel?.streamingUrl || s?.stream || s?.streamUrl || s?.stream_url || null,
      title: s?.name || s?.title || s?.id || null,
      subtitle: s?.tagline || s?.subtitle || null,
      image: s?.artwork || firstChannel?.artwork || firstChannel?.logo?.default || null,
      listeners: s?.listeners ? String(s.listeners) : null,
      description: s?.description || s?.shortDescription || null,
      playlists: s?.playlists || s?.recentPlaylists || null,
    };
    console.log('Mapped:', JSON.stringify(mapped, null, 2));
  } catch (e) {
    console.error('ERR', e.message || e);
  }
})();
