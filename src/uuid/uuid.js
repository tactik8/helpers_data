
export const uuidService = {
    new: generateUUIDv4,
}


function generateUUIDv4() {
    // Use crypto.getRandomValues for better randomness if available,
    // otherwise fallback to Math.random (less secure but still functional).
    // This approach ensures compatibility with various environments.

    const randomBytes = new Uint8Array(16);

    let c1 = false;
    try {
        c1 = window.crypto && window.crypto.getRandomValues;
    } catch (error) {}

    if (c1 === true) {
        window.crypto.getRandomValues(randomBytes);
    } else {
        // Fallback for environments without window.crypto (e.g., older browsers)
        for (let i = 0; i < 16; i++) {
            randomBytes[i] = Math.floor(Math.random() * 256);
        }
    }

    // Set the four most significant bits of the 7th byte to 0100'B (version 4)
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    // Set the two most significant bits of the 9th byte to 10'B (variant 1, RFC 4122)
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

    // Convert the byte array to a hexadecimal string representation of the UUID
    let uuid = "";
    for (let i = 0; i < 16; i++) {
        // Convert each byte to its two-digit hexadecimal representation
        const hex = randomBytes[i].toString(16).padStart(2, "0");
        uuid += hex;

        // Add hyphens at the standard UUID positions
        if (i === 3 || i === 5 || i === 7 || i === 9) {
            uuid += "-";
        }
    }

    return uuid;
}
