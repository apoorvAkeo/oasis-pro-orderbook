import * as React from 'react';
const loader: string = require("../../../src/loader.gif");
const Loader = () => {
    return(
        <div className='loader'><img src={loader} /></div>
    )
}

export default Loader;