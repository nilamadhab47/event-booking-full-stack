export default function(str){
    if(str===null){
        return ""
    }

    let a = new Date(str)
    let b = a.toDateString()
    if(b.length===15){
        return (str.toISOString().substring(0, 10))
    }
    else return ""
    }
