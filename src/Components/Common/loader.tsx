import * as React from 'react';
const loader: string = require("../../../src/Ajax-loader.gif");
const Loader = () => {
    return(
        <div className='wrapperLoader'><div className='loader'><img src={loader} /></div></div> 
    )
}

export default Loader;