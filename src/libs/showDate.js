export function dummyFunction() {
    console.log('dummy function');
}

// this is a dummy function which is not used anywhere
// and can be removed through tree shaking with webpack 
// this is available by default with no config and removes
// unused code in prod mode 