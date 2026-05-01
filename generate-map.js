const DottedMap = require('dotted-map');
const fs = require('fs');

const map = new DottedMap.default({ height: 100, grid: 'diagonal' });

const svg = map.getSVG({
  radius: 0.22,
  color: '#FFFF7F40',
  shape: 'circle',
  backgroundColor: 'transparent'
});

fs.writeFileSync('world-map.svg', svg);
console.log('Dimensione SVG:', svg.length, 'bytes');
