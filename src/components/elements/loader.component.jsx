import React from 'react';
const Loader = props => {
    return(
        <div className="loader">
            <div style={load(props)} className="bar"></div>
        </div>
    )
}
const load = props => {
    let loop = props.isLoading?'infinite':0;
    return {
        animationIterationCount: loop,
    } 
}
export default Loader;