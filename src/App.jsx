import React, { useState, useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './App.css';
import ParameterControls from './components/ParameterControls';
import SwarmalatorViz from './components/SwarmalatorViz';
import SwarmalatorFormulae from './components/Formulae';


const viewHeight = window.innerHeight;
const viewWidth = window.innerWidth;
const appMinWidth = 480;
// const initRadius = Math.min(600, Math.max(450, viewHeight * 0.6));
const initRadius = Math.min(600, Math.max(450, viewWidth * 0.3));
const numInitSwarmalators = 600;
const combinationsJK = [{J:1, K:-0.75},
                        {J:1, K:-0.75},
                        {J:0.1, K:1},
                        {J:0.1, K:-1},
                        {J:0.1, K:-1},
                        {J:1, K:0},
                        {J:1, K:-0.1},
                        {J:1, K:-0.1},
                        {J:1, K:-0.1},]
var paramIndex = 0;
// const width = initRadius;
// const height = initRadius;



function App() {
  const [parameters1, setParameters1] = useState({numSwarmalators:numInitSwarmalators,
                                                  J:1, 
                                                  K:-0.1,
                                                  active: true,});
  const [parameters2, setParameters2] = useState({numSwarmalators:numInitSwarmalators, 
                                                  J:combinationsJK[paramIndex].J, 
                                                  K:combinationsJK[paramIndex].K,
                                                  active: false,});

  useEffect(() => {
    // Function to update the params
    const updateParams = () => {
      paramIndex ++;
      paramIndex = paramIndex % combinationsJK.length;

      setParameters2(prev => {
        // Logic to update the params
        // For example, toggling a value
        return { ...prev, J: combinationsJK[paramIndex].J, K: combinationsJK[paramIndex].K};
      });
    };

    // Set the interval to update the params every 8 seconds
    const intervalId = setInterval(updateParams, 8000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{"width": viewWidth * 0.3, "minWidth": appMinWidth}} className="App">
      <header className="App-header">
        <h1>SWARMALATORS</h1>
        <h2>Background</h2>
        <p>
          The swarm behavior is the collective motion of a large number of self-propelled entities.
          Many swarming systems in Nature show the remarkable ability to spontaneously fall into synchrony,
          giving rise to a large number of bio-inspired models. Many researchers have studied the close relation
          between swarming and synchronization, which interestingly represent two effects that stand as "spatiotemporal opposites".
          Among them, O'Keefe et al. (2019) proposed a ‘bottom-up’ models without reference to a background medium, which they called
          the ‘swarmalators’, to capture their twin identities as swarming oscillators. In the swarmalator model,
          the paradigmatic model of biological aggregation and synchronization have the following forms:
        </p>

        <SwarmalatorFormulae />

        <p>
          We see in the position updates a positive attraction term followed by a negative repulsion term, typical of most swarming systems.
          The phase updates feature a variation of the canonical Kuramoto model for coupled oscillators that may synchronize or desynchronize
          based on the value of <em>K</em>. Thus, the terms <em>K</em> and <em>J</em> capture the tendency to synchronize/desynchronize and the spatial
          attraction/repulsion between entities of similar phases respectively. A combination of different <em>K</em> and <em>J</em> values yield a series
          of different swarmalator states shown as follows:
        </p>
        
        <ol>
        <li><strong>Static Sync: </strong>
            <InlineMath math={`(J,K) = (0.1,1)`} />
        </li>
        <li><strong>Static Async: </strong>
            <InlineMath math={`(J,K) = (0.1,-1)`} />
        </li>
        <li><strong>Static Phase Wave: </strong>
            <InlineMath math={`(J,K) = (1,0)`} />
        </li>
        <li><strong>Splintered Phase Wave: </strong>
            <InlineMath math={`(J,K) = (1,-0.1)`} />
        </li>
        <li><strong>Active Phase Wave: </strong>
            <InlineMath math={`(J,K) = (1,-0.75)`} />
        </li>
      </ol>
      <p style={{textAlign:"center", color:"#32CD32"}}><strong>Try it Out Using the Sliders On the Right --></strong></p>

      <h2>N-body Problem</h2>
        <p>
          The swarmalator model simulation intuitively falls into the category of a special kind of N-body problem, which is traditionally compute intensive.
          The dynamic scale that needs to be resolved for studying a real-world swarming system in a self-consistent manner is enormous and spans many orders
          of magnitudes, thus necessitating the use of high performance computing and carefully tailored codes that can utilize various HPC programming models.
          Naively, the Swarming-Synching model can be simulated by pairwise calculation of aggregation and synchronization forces of individual points and adding up all such contributions
          on all the entities in the system. Such an approach has a quadratic time complexity and scales up very quickly, stretching into the realm of hours for swarms in the thousand. 
                 </p>

      <h2>Parallelization with Barnes-Hut</h2>
        <p>
          Most of the time, when we deal with realistic problems, the entities in a swarm system can be hundreds of millions. Under these scenarios, the quadratic scaling of the naive algorithm
          is not feasible and approximate models using tree-based data structures, for example, the Barnes-Hut algorithmm, may be utilized to facilitate the computation. 
          As far as big compute techniques are concerned, there is large potential for these algorithms to benefit from parallelization methods such as OpenMP and MPI and as the two algorithms use different data structure, 
          there are differences in where the parallelization can take place and eventually contribute to an overall speedup. 
        </p>

        <p>
        We carried out an experiment on the performance of parallelized implementation of both the naive algorithm and 
        the Barnes-Hut algorithm that address the same swarming-synching model, 
        to look into the potential of parallelization in both models and to compare the consequent speedups. Implementation details can be found in the following link:
        </p>

        <p style={{marginBottom:"50px", textAlign:"center", color:"#32CD32"}}><a style={{color:"#32CD32"}} href="https://github.com/Kharasso/swarming-synchronization" target="_blank">https://github.com/Kharasso/swarming-synchronization</a></p>

      </header>

      <main>
        
        <div style={{"left": Math.max(viewWidth * 0.3, appMinWidth) + 50}} className="dashboard">
        {/* <div style={{"left": Math.max(viewWidth * 0.3, appMinWidth) + 100}} className="dashboard"> */}
          <div className="viz-container">
              <SwarmalatorViz initRadius={initRadius} parameters={parameters1} />
              {/* <SwarmingBehaviorViz width={400} height={400} parameters={parameters1} /> */}
              <ParameterControls parameters={parameters1} setParameters={setParameters1} />
            </div>

          

            <div className="viz-container">
              <SwarmalatorViz initRadius={initRadius} parameters={parameters2} />
              {/* <SwarmingBehaviorViz width={400} height={400} parameters={parameters1} /> */}
              <ParameterControls parameters={parameters2} setParameters={setParameters2} />
            </div>

        </div>

      </main>

      <footer style={{"left": Math.max(viewWidth * 0.3, appMinWidth) + 165, "maxWidth": 1.55 * initRadius}}>
        <p>REFERENCE: <i>O’Keeffe, K.P., & Bettstetter, C. (2019). A review of swarmalators and their potential in bio-inspired computing. Defense + Commercial Sensing.</i></p>
      </footer>

    </div>
  );
}

export default App;