const NUM = 45;

interface Cat {
    name: String,
    sex: String
}

function touchCat(cat: Cat) {
    console.log(cat.name);
}

touchCat({
    name: 'Hello',
    sex: 'man'
})