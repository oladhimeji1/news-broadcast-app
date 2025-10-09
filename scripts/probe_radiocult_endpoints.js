const endpoints = [
  'https://app.radiocult.fm/api/station/refwordfm',
  'https://app.radiocult.fm/api/stations/refwordfm',
  'https://app.radiocult.fm/api/stations',
  'https://app.radiocult.fm/api/station?station=refwordfm',
  'https://app.radiocult.fm/api/v1/station/refwordfm',
  'https://app.radiocult.fm/api/v1/stations/refwordfm',
  'https://app.radiocult.fm/stations/refwordfm.json',
  'https://app.radiocult.fm/station/refwordfm.json',
];

async function probe() {
  for (const url of endpoints) {
    process.stdout.write(`Probing ${url} ... `);
    try {
      const res = await fetch(url);
      const t = res.headers.get('content-type') || '';
      const body = await res.text();
      console.log(`status=${res.status} content-type=${t} len=${body.length}`);
      console.log(body.slice(0, 800));
      console.log('---');
    } catch (err) {
      console.log('error', err && err.message ? err.message : err);
    }
  }
}

probe();
