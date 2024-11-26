import React from 'react';

const GooeyFilter = () => {
  return (
    <svg aria-hidden='true'>
      <defs>
        <filter id='goo-effect'>
          <feGaussianBlur
            in='SourceGraphic'
            stdDeviation='5'
            result='blur'
          ></feGaussianBlur>
          <feColorMatrix
            in='blur'
            type='matrix'
            values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15'
            result='goo'
          ></feColorMatrix>
          <feComposite
            in='SourceGraphic'
            in2='goo'
            operator='atop'
          ></feComposite>
        </filter>
      </defs>
    </svg>
  );
};

export default GooeyFilter;
