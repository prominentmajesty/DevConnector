import React from 'react';
import Spinner from '../img/./Spinner.gif';

function Spiner() {
  return (
    <Fragment>
        <img
        src={Spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
        />
    </Fragment>
  )
}

export default Spiner