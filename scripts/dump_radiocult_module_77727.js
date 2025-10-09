(async()=>{
  const fetch = global.fetch || require('node-fetch');
  const url = 'https://app.radiocult.fm/_next/static/chunks/pages/_app-d8aec1e4ab4b70b7.js';
  console.log('Fetching', url);
  const r = await fetch(url);
  const txt = await r.text();
  const id = '77727';
  const marker = id + ':function';
  const idx = txt.indexOf(marker);
  if (idx === -1) {
    console.error('module marker not found');
    return;
  }
  // Find opening brace of function body
  const fnStart = txt.indexOf('{', idx + marker.length);
  if (fnStart === -1) {
    console.error('function start brace not found');
    return;
  }
  // Find matching closing brace
  let depth = 0;
  let end = -1;
  for (let i = fnStart; i < txt.length; i++) {
    const ch = txt[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) {
    console.error('matching end brace not found');
    return;
  }
  const moduleText = txt.slice(idx, end+1);
  console.log('Module snippet (first 4000 chars):\n');
  console.log(moduleText.slice(0,4000));
  console.log('\n--- Searching module for api usages ---\n');
  const needles = ['/api/station', '.hx(', '.CJ(', '.tz(', 'fetch(', 'axios', 'listenUrl', 'streaming'];
  for (const n of needles) {
    const i = moduleText.indexOf(n);
    if (i >= 0) {
      const start = Math.max(0, i-120);
      const end2 = Math.min(moduleText.length, i+120);
      console.log('FOUND', n, 'at', i, 'context:\n', moduleText.slice(start,end2));
    }
  }
})();
