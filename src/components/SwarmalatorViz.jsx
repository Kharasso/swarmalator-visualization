import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const radius = 2;
const dt = 0.3;
const scale = 0.5;

const generateSwarmalators = (num) => {
    return Array.from({ length: num }, () => {
        let len = 0.5;
        let r = len * Math.sqrt(Math.random());
        let theta = Math.random() * 2 * Math.PI;
  
        return {
          x: r * Math.cos(theta) ,
          y: r * Math.sin(theta),
          phase: Math.random() * 2 * Math.PI,
          omega: 0.25 * Math.PI ,
        }
      });
  };
  
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  
  const updateSwarmalators = (swarmalators, numSwarmalators, J, K) => {
    return swarmalators.map((s, i, arr) => {
      let dx = 0;
      let dy = 0;
      let dPhase = 0;
  
      arr.forEach((other, j) => {
        if (i !== j) {
          const dist = distance(other, s);
          const phaseDiff = other.phase - s.phase;
          const diffX = other.x - s.x;
          const diffY = other.y - s.y;
          const coeff = 1 + J * Math.cos(phaseDiff);
  
          if (dist > 0) {
            // const phaseDiff = Math.sin(other.phase - s.phase);
            dx += diffX * coeff / dist - diffX / (dist * dist);
            dy += diffY * coeff / dist - diffY / (dist * dist);
            dPhase += K * Math.sin(phaseDiff) / dist;
          }
        }
      });
  
      // if (i === 0){
      //   console.log(dx * dt / numSwarmalators);
      //   console.log(dy * dt / numSwarmalators);
      // }
  
      return {
        x: s.x + dx * dt / numSwarmalators,
        y: s.y + dy * dt / numSwarmalators,
        phase: s.phase + s.omega * dt + dPhase * dt / numSwarmalators,
        omega: s.omega
      };
    });
  };
  
  function SwarmalatorViz ({initRadius, parameters}) {
    const width = initRadius;
    const height = initRadius;
    const svgRef = useRef();
    const [swarmalators, setSwarmalators] = useState(generateSwarmalators(parameters.numSwarmalators));
  
    useEffect(() => {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
  
      svg.append("g")
        .selectAll("circle")
        .data(swarmalators)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", d => d3.interpolateRainbow(d.phase / (2 * Math.PI)))
        .attr("cx", d => (d.x * initRadius / 2) * scale + initRadius / 2)
        .attr("cy", d => (d.y * initRadius / 2) * scale + initRadius / 2);
  
      const interval = setInterval(() => {
        const newSwarmalators = updateSwarmalators(swarmalators, parameters.numSwarmalators, parameters.J, parameters.K);
        setSwarmalators(newSwarmalators);
        svg.selectAll("circle")
          .data(newSwarmalators)
          .attr("cx", d => (d.x * initRadius / 2) * scale + initRadius / 2)
          .attr("cy", d => (d.y * initRadius / 2) * scale + initRadius / 2)
          .attr("fill", d => d3.interpolateRainbow(d.phase / (2 * Math.PI)));
      }, 23);
  
      return () => clearInterval(interval);
    }, [swarmalators]);
  
    return <svg ref={svgRef} width={width} height={height}></svg>;
  };


export default SwarmalatorViz;