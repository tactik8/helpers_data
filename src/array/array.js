

export const arrayService = {
    isValid: isArray,
    isArray: isArray,
    toArray: toArray,
    getFirst: getFirst,
    getLast: getLast
}



function isArray(value){
    return Array.isArray(value)
}

function toArray(value, defaultValue){

    try{
        value = Array.isArray(value) ? value : [value]
        value = value.filter(item => item !== undefined)
        return value
        
    } catch(error){
        return processError('toArray', error, defaultValue)
    }
}

function getFirst(value, defaultValue){
    try{
        if(isArray(value) === false){
            return processError('Invalid array', null, defaultValue)
        }

        if(value.length === 0){
            return undefined
        } else {
            return value[0]
        }
        
    } catch(error){
        return processError('getFirst', error, defaultValue)
    }
}

function getLast(value, defaultValue){
    try{
        if(isArray(value) === false){
            return processError('Invalid array', null, defaultValue)
        }

        if(value.length === 0){
            return undefined
        } else {
            return value?.[value.length - 1]
        }
       
        
    } catch(error){
        return processError('getLast', error, defaultValue)
    }
}


// -----------------------------------------------------
//  error processing 
// -----------------------------------------------------



function processError(message, error, defaultValue){
    if(defaultValue !== undefined){
        return defaultValue
    }
    throw(message + ' - ' + String(error))
}
