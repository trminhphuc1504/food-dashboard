// export có 2 dạng export
// 1. export ko default
// 2. export default

//export ko default
export const sum = (a,b)=>{ 
    return a + b
}

//export default
const logger = (message)=>{
    console.log({message});
}
const cong = (a , b)=>{
    return a + b
}

const tru = (a, b)=>{
    return a -b
}

//Note: 1 file chỉ đc phép export default 1 lần duy nhất
export default {
    cong,
    tru
}

