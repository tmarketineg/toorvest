const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const SITE_ID = '6d063c55-ca1a-4f65-bc76-6e328a7d0940';
const AUTH = 'nfp_Cskac3e49yFoopDytnrsXBkgDWqQmY9d83a6';
const ROOT = __dirname;
const WEB_DIR = path.join(ROOT, 'apps/web');

function sha1(content) {
  return crypto.createHash('sha1').update(content).digest('hex');
}

const files = {};
const hashMap = {};

// Add netlify.toml
const ntContent = fs.readFileSync(path.join(ROOT, 'netlify.toml'));
const ntHash = sha1(ntContent);
files['/netlify.toml'] = ntHash;
hashMap[ntHash] = { localPath: path.join(ROOT, 'netlify.toml'), netlifyPath: '/netlify.toml' };

// Walk web dir
function walkDir(dir, base) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.join(base, e.name).replace(/\\/g, '/');
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue;
      walkDir(full, rel);
    } else {
      const content = fs.readFileSync(full);
      const key = '/' + rel;
      const hash = sha1(content);
      files[key] = hash;
      hashMap[hash] = { localPath: full, netlifyPath: key };
    }
  }
}
walkDir(WEB_DIR, '');

console.log('Total files:', Object.keys(files).length);

const body = JSON.stringify({ files, branch: 'main' });

const req = https.request({
  hostname: 'api.netlify.com',
  path: `/api/v1/sites/${SITE_ID}/deploys`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${AUTH}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const j = JSON.parse(data);
    console.log('Deploy ID:', j.id);
    console.log('State:', j.state);
    console.log('URL:', j.ssl_url);
    
    if (j.required && j.required.length > 0) {
      console.log('Uploading', j.required.length, 'new files...');
      uploadFiles(j.required, j.id);
    } else {
      console.log('All files cached - deploy ready!');
    }
  });
});
req.write(body);
req.end();

function uploadFiles(required, deployId) {
  let idx = 0;
  
  function uploadNext() {
    if (idx >= required.length) {
      console.log('All files uploaded!');
      return;
    }
    
    const hash = required[idx];
    const info = hashMap[hash];
    
    if (!info) {
      console.log(`  SKIP ${hash}: no mapping`);
      idx++;
      uploadNext();
      return;
    }
    
    const content = fs.readFileSync(info.localPath);
    
    const opts = {
      hostname: 'api.netlify.com',
      path: `/api/v1/deploys/${deployId}/files/${hash}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${AUTH}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': content.length
      }
    };
    
    const r = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        idx++;
        if (idx % 10 === 0 || idx === required.length) {
          console.log(`  [${idx}/${required.length}] ${info.netlifyPath}`);
        }
        uploadNext();
      });
    });
    r.write(content);
    r.end();
  }
  
  uploadNext();
}
