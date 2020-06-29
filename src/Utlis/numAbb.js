const numAbb = value => {
    let suffixes = ["", "K", "M", "B","T"];
    let suffixNum = Math.floor((""+value).length/3);
    let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3));
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(2);
    return shortValue + suffixes[suffixNum];
}

const numAbbString = n => { 
    if (n < 1e6) return n;
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M"; 
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B"; 
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T"; 
};

export default numAbbString;