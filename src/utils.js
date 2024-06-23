export const parseFileContent = (file) => {
  const lines = file.trim().split('\n');
  console.log(lines)
  const [maxX, maxY] = lines[0].split('').map(Number);
  console.log([maxX, maxY])

  const mowers = [];
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, orientation] = lines[i].split(' ');
    console.log(`Position et orientation: x = ${x}, y = ${y}, orientation = ${orientation}`);
    const instructions = lines[i + 1];
    console.log(`Instructions: ${instructions}`)
    mowers.push({ x: parseInt(x), y: parseInt(y), orientation, instructions });
  }
  console.log(mowers)

  return { maxX, maxY, mowers };
};

const fileContent = `55
44 S
LFRRFFLFRFF
22 N
FFRLLRFRLF`;

const result = parseFileContent(fileContent);
console.log(result);