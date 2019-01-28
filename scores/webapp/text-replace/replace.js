const replace = require('replace-in-file');

let file;
let from;
let to;

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        console.log("file", val);
        file = val;
    } 
    if (index == 3) {
        console.log("from", val);
        from = val;
    };
    
    if (index == 4) {
        console.log("to", val);
        to = val;
    };
});

let regex = new RegExp(from, 'g')

const options = {
    files: file,
    from: regex,
    to: to,
};

try {
    const changes = replace.sync(options);
    console.log('Modified files:', changes.join(', '));
}
catch (error) {
    console.error('Error occurred:', error);
}