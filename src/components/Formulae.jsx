import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const SwarmalatorFormulae = () => {
    return (
        <div>
          <p><strong>Position update equation:</strong></p>
          <BlockMath math={`\\frac{d\\mathbf{x}_i}{dt} = \\frac{1}{N} \\sum_{j \\neq i} \\left( \\frac{\\mathbf{x}_j - \\mathbf{x}_i}{|\\mathbf{x}_j - \\mathbf{x}_i|} (1 + J \\cos(\\theta_j - \\theta_i)) - \\frac{\\mathbf{x}_j - \\mathbf{x}_i}{|\\mathbf{x}_j - \\mathbf{x}_i|^2} \\right)`} />
          <p><strong>Phase update equation:</strong></p>
          <BlockMath math={`\\dot{\\theta_i} = \\omega_i + \\frac{K}{N} \\sum_{j \\neq i} \\frac{\\sin(\\theta_j - \\theta_i)}{|\\mathbf{x}_j - \\mathbf{x}_i|}`} />
        </div>
    );
  };
  
  export default SwarmalatorFormulae;