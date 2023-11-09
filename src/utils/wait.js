export const wait = async function(ms = 100, callback){
    ms = Math.max(0,parseInt(ms));
    return new Promise((resolve) =>{
        setTimeout(()=>{
            
            if(callback) callback();

            resolve();
        },ms)
    })
}