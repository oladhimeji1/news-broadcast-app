const fs = require('fs');

async function run() {
  const url = 'https://app.radiocult.fm/embed/player/refwordfm';
  console.log('Fetching', url);
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body length:', text.length);
    const sample = text.slice(0, 2000);
    console.log('--- SAMPLE START ---');
    console.log(sample);
    console.log('--- SAMPLE END ---');
    fs.writeFileSync('tmp_radiocult_embed.html', text, 'utf8');
    console.log('Saved full response to tmp_radiocult_embed.html');
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

run();
