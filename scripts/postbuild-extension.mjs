import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

if (!existsSync(dist)) {
  throw new Error('dist folder not found. Run vite build first.');
}

const copy = (from, to) => copyFileSync(resolve(root, from), resolve(dist, to));

copy('manifest.json', 'manifest.json');
copy('background.js', 'background.js');

if (!existsSync(resolve(dist, 'newtab.html')) && existsSync(resolve(dist, 'index.html'))) {
  copyFileSync(resolve(dist, 'index.html'), resolve(dist, 'newtab.html'));
}

if (existsSync(resolve(dist, 'public'))) {
  rmSync(resolve(dist, 'public'), { recursive: true, force: true });
}

if (!existsSync(resolve(dist, 'icons')) && existsSync(resolve(root, 'public/icons'))) {
  mkdirSync(resolve(dist, 'icons'), { recursive: true });
  for (const icon of readdirSync(resolve(root, 'public/icons'))) {
    copyFileSync(resolve(root, `public/icons/${icon}`), resolve(dist, `icons/${icon}`));
  }
}

console.log('Extension postbuild complete: manifest/background/newtab/icons ensured in dist/');
