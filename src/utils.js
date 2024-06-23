export const parseFileContent = (file) => {
    const lines = file.trim().split('\n');
    const [maxX, maxY] = lines[0].split('').map(Number);
  
    const mowers = [];
    for (let i = 1; i < lines.length; i += 2) {
      const line = lines[i].trim();
      const instructions = lines[i + 1].trim();
      // x, y, et orientation sur la ligne concerné par le fichier
      const match = line.match(/^(\d)(\d)\s([NSEW])$/);
        console.log(match)
      if (match) {
        const x = parseInt(match[1], 10); //(\d)
        const y = parseInt(match[2], 10); //(\d)
        const orientation = match[3]; //([NESW])
  
        console.log(`Position: x = ${x}, y = ${y}, Orientation = ${orientation}`);
        console.log(`Instructions: ${instructions}`);
  
        mowers.push({ x, y, orientation, instructions });
      } else {
        console.error(`Format de ligne incorrect: '${line}'`);
      }
    }
  
    console.log(mowers);
  
    return { maxX, maxY, mowers };
  };

const moveForward = (x, y, orientation, maxX, maxY) => {
  switch (orientation) {
    case 'N': 
    return y + 1 <= maxY ? { x, y: y + 1 } : { x, y };
    case 'S': 
    return y - 1 >= 0 ? { x, y: y - 1 } : { x, y };
    case 'E': 
    return x + 1 <= maxX ? { x: x + 1, y } : { x, y };
    case 'W': 
    return x - 1 >= 0 ? { x: x - 1, y } : { x, y };
    
    default: return { x, y };
  }
};
//                N        , L
const rotate = (orientation, direction) => {
  // dnas l'odre horaire  
  const orientations = ['N', 'E', 'S', 'W'];
  const currentIndex = orientations.indexOf(orientation); 
  //nouvel index après rotation
  const newIndex = (direction === 'L')
    ? (currentIndex + 3) % 4 //recule dans [orientations]
    : (currentIndex + 1) % 4; //avance dans [orientation]
    console.log(newIndex)
  return orientations[newIndex];
};

export const executeInstructions = (mower, maxX, maxY) => {
    //destructuration
  let { x, y, orientation } = mower;

  for (let instruction of mower.instructions) {
    if (instruction === 'F') {
        //maj des nouvelles coordonné après appel de moveForward
      ({ x, y } = moveForward(x, y, orientation, maxX, maxY));
    } else {
        //L ou R on appelle la fonction rotate
      orientation = rotate(orientation, instruction);
    }
  }

  return { x, y, orientation };
};

const fileContent = `55
44 S
LFRRFFLFRFF
22 N
FFRLLRFRLF`;

const result = parseFileContent(fileContent);
console.log(result);