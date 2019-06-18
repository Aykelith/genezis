/**
 * @description Count how many times an object has a property in an array
 * @exports default
 * 
 * @param {*} array 
 * @param {*} property 
 * @param {*} value 
 */
export default (array, property, value) => {
    let numberOfObjects = 0;
    array.forEach(data => {
        if (data[property]) {
            if (value === undefined || data[property] === value) {
                ++numberOfObjects;
            } 
        }
    });

    return numberOfObjects;
}