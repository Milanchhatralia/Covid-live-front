const debounce = (func, delay) => {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

const throttle = (func, limit) => {
    let flag = true;
    return function() {
        const context = this,
            args = arguments;
        if(flag){
            func.apply(context, args);
            flag = false;
            setTimeout(() => { flag = true }, limit);
        }
    }
}
export {
    debounce, 
    throttle,
}