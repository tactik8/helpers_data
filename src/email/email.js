

export const emailService = {
    isValid: isValid,
    isEmail: isValid,
    toEmail: toEmail,
    getDomain: getDomain,
    getUsername: getUsername,
}


function isValid(email) {
    /**
     * Checks if an email is valid
     * @param {String} email
     * @returns {Boolean}
     * 
     */
    if (typeof email !== 'string') {
        throw new TypeError('The provided value must be a string.');
    }

    // Regular expression to validate email addresses
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;

    return emailRegex.test(email);
}


function toEmail(email, defaultValue){
    /**
     * Converts a string to an email address
     */

    return email
}

function getUsername(email){
    /**
     * Returns the username of an email address
     * @param {String} email
     * @returns {String} The domain
     * 
     */

    if(!isValid(email)){
        return null
    }

    return email.split('@')[0]

}


function getUsernamePattern(email){
    /**
     * Returns the pattern of the username of an email address
     * todo: complete
     */
    if(!isValid(email)){
        return null
    }

    let username = getUsername(email)

    return 


}



function getDomain(email){
    /**
     * Returns the domain of an email address
     * @param {String} email
     * @returns {String} The domain
     * 
     */

    if(!isValid(email)){
        return null
    }

    return email.split('@')[1]

}