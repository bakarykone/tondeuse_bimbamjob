import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { parseFileContent, executeInstructions } from '../utils';

function Tondeuse() {
  const [results, setResults] = useState([]);

  const handleFileLoaded = (content) => {
    const { maxX, maxY, mowers } = parseFileContent(content);
    const finalPositions = mowers.map(mower => executeInstructions(mower, maxX, maxY));
    setResults(finalPositions);
  };
  

  return (
    <div>
      <h1>BimBamJob Tondeuse</h1>
      <FileUpload onFileLoaded={handleFileLoaded} />
      <div>
        {results.map((result, index) => (
          <p key={index}>Pour la tondeuse {index + 1} [{result.x}, {result.y}] et orientation W {result.orientation}</p>
        ))}
      </div>
    </div>
  );
}

export default Tondeuse;