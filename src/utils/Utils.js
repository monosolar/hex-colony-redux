import { mapColumns, mapRows } from '../consts/MapSizesConsts'

export function getUniqueId() {
    return s4() + s4();
};

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function getGroupedObject(array, key) {
    return array.reduce((make, item) => {
        (make[item[key]] = make[item[key]] || []).push(item);
        return make;
    }, {});
};

export function isRowOdd(currentIndex) {
    return (Math.floor(currentIndex/mapColumns) % 2) ? true : false;
}

export function rndm(maxValue) {
    return Math.floor(Math.random()*maxValue);
}