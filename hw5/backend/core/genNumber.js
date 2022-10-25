var number
function genNumber(){
    number = Math.floor(Math.random() * 100) + 1
}
function getNumber(){
    return number
}
export {getNumber, genNumber}