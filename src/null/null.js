export const nullService = {
    isNull: isNull,
    isNUll: isNull,
    isNotNull: isNotNull,
    isNotNUll: isNotNull,
    isEqual: isEqual,
    isNotEqual: isNotEqual
};

function isNotNull(value) {
    /**
     * Returns true if value is not null
     * @param {Object} value
     * @returns {Boolean}
     */
    return !isNull(value);
}

function isNull(value) {
    /**
     * Returns true if value is null
     * @param {*} value
     * @returns {boolean}
     * 
     */
    if (value === 0) {
        return false;
    }
    if (value === undefined) {
        return true;
    }
    if (value === null) {
        return true;
    }
    if (value === "") {
        return true;
    }


    if (Number.isNaN(value)) {
        return true;
    }

    try{
        if(value instanceof HTMLElement){
            return false
        }
    } catch {}


    // Check if date
    try{

        if(value instanceof Date){
            return false
        }

    } catch (error){ }


    // If array, removes null values then check if length == 0
    if (Array.isArray(value)) {
        value = value.filter((x) => isNull(x) == false);
        if (value.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    // If object, check if it has keys
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
        if (Object.keys(value).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    // Catch all
    return false;
}



function isNotEqual(value1, value2){
    /**
     * Returns true if value1 is not equal to value2
     * @param {*} value1
     * @param {*} value2
     * @returns {boolean}
     */
    return !isEqual(value1, value2) 
}

function isEqual(value1, value2) {
    /**
     * Returns true if value1 is equal to value2
     * @param {*} value1
     * @param {*} value2
     * @returns {boolean}
     */
    // if nulls
    if (isNull(value1) && isNull(value2)) {
        return true;
    }

    if (isNull(value1) && isNotNull(value2)) {
        return false;
    }

    if (isNotNull(value1) && isNull(value2)) {
        return false;
    }


    // Equality for others
    try {
        if (value == value2) {
            return true;
        }
    } catch {}




    // Equality for Thing
    let v1_record_type = value1?.record_type || value1?.["@type"];
    let v2_record_type = value2?.record_type || value2?.["@type"];
    let v1_record_id = value1?.record_id || value1?.["@id"];
    let v2_record_id = value2?.record_id || value2?.["@id"];

    if (isNull(v1_record_type) && isNotNull(v2_record_type)) {
        return false;
    }
    if (isNotNull(v1_record_type) && isNull(v2_record_type)) {
        return false;
    }
    if (isNull(v1_record_id) && isNotNull(v2_record_id)) {
        return false;
    }
    if (isNotNull(v1_record_id) && isNull(v2_record_id)) {
        return false;
    }

    if (isNotNull(v1_record_type) && isNotNull(v2_record_type)) {
        if (isNotNull(v1_record_id) && isNotNull(v2_record_id)) {
            if (
                v1_record_type == v2_record_type &&
                v1_record_id == v2_record_id
            ) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Equality for objects
    try {
        if (JSON.stringify(value1) == JSON.stringify(value2)) {
            return true;
        }
    } catch {}



    return false;
}


