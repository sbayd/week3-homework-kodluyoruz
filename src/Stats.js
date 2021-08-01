import React from 'react';

const Stats = ({ stats = [] }) => {
  return (<div>
    Most Spoken Languages
    {stats.map(({ name, count }) => {
      return (<div key={name}>
        {name}
          - 
        {count}
      </div>);
    })}
  </div>)
}

export default Stats;