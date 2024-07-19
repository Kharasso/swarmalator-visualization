import { active } from 'd3';
import React from 'react';

function ParameterControls({ parameters, setParameters }) {
    return (
      <div className="controls">
        <label>
          J = {parameters.J}
        </label>
        <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1" 
            value={parameters.J}
            onChange={e => setParameters({ ...parameters, J: +e.target.value })}
            disabled={!parameters.active}
          />
        <label>
          K = {parameters.K.toFixed(2)}
        </label>
        <input
            type="range"
            min="-1.0"
            max="1.0"
            step="0.05" 
            value={parameters.K}
            onChange={e => setParameters({ ...parameters, K: +e.target.value })}
            disabled={!parameters.active}
        />
        {/* <label>
          # = {parameters.numSwarmalators}
        </label> */}
        {/* <input
            type="range"
            min="250"
            max="750"
            step="1" 
            value={parameters.numSwarmalators}
            onChange={e => setParameters({ ...parameters, numSwarmalators: +e.target.value })}
          /> */}
        {/* <label>
          Color:
          <input
            type="color"
            value={parameters.color}
            onChange={e => setParameters({ ...parameters, color: e.target.value })}
          />
        </label> */}
        {/* Add more controls as needed */}
  
      </div>
    );
  }

  export default ParameterControls;