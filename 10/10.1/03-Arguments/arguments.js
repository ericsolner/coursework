// process.argv will print out any command line arguments.
console.log(process.argv.slice(2).reverse());

for (let index = 2; index < process.argv.length; index++) {
    console.log(process.argv[index]);
    
}
