import fs from 'node:fs';
for(const f of ['index.html','kakao-map.html','franchise.html','meal-kit.html','styles.css','app.js','content.json','assets/brand-board.png','assets/idungi-logo.png','assets/store-interior.jpg','assets/dakgalbi.webp','assets/sides.webp','assets/fonts.css','assets/noto-sans-kr.woff','assets/noto-sans-kr-black.woff']){if(!fs.existsSync('public/'+f))throw new Error('Missing asset: '+f)}
JSON.parse(fs.readFileSync('public/content.json','utf8'));
fs.rmSync('dist',{recursive:true,force:true});
fs.cpSync('public','dist',{recursive:true});
console.log('Static website built and validated. Deploy dist/.');
