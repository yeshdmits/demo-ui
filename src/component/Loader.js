import React from 'react';

const Loader = ({enabled}) => (
    enabled && 
    <div id="loader-div">
        <div id="loader"></div>
    </div>
)

export default Loader;