
import { nullService } from "../null/null.js";

const h = {
    null: nullService,
    isNull: nullService.isNull,
    isNotNull: nullService.isNotNull,
};

/** @const {Object}  krakenDateHelpers
 * - isDate: Determiens if value is of type Date
 * - toDate: Converts a value (string, etc.) to Date
 * - getDuration: Returns duration between two dates
 * - getDurationRecord: Returns duration in schema.org QuantitativeValue record
 */
export const dateService = {
    // Base
    isValid: isValid,
    isDate: isValid,
    toDate: toDate,
    toString: toString,

    now: getCurrentDateObject,

    eq: eq,
    ne: ne,
    lt: lt,
    gt: gt,

    duration: getDuration,
    getDurationRecord: getDurationRecord,
    human: {
        duration: getHumanReadableDuration,
        date: getHumanReadableDate,
    },
    iso: {
        getIsoDurationFromDates: toISODurationFromDates,
        getTextFromIsoDuration: convertISODurationToEnglish,
        getIsoDurationFromText: convertEnglishToISODuration,
    },
};

/**
 * Handles conversion failure by either returning the default value or throwing an error.
 *
 * @param {Date} defaultValue - The default value to return if provided.
 * @param {string} errorMessage - The error message to use if no default value is provided.
 * @returns {Date} - The default value, if provided.
 * @throws {Error} - If no default value is provided.
 */
function handleFailure(defaultValue, errorMessage) {
    if (defaultValue === undefined) {
        throw new Error(errorMessage);
    } else {
        return defaultValue;
    }
}

/**
 * Returns true if value if a Date object
 * @param {String | Date | object} value
 * @return {bool} isDate True if date object
 */
function isValid(value) {
    /**
     * Returns true if value if a Date object
     * @param {String | Date | object} value
     * @return {bool} isDate True if date object
     */

    if (value instanceof Date) {
        return true;
    }

    return false;
}

function toDate(value, defaultValue) {
    /**
     * Converts a value (string, etc.) to Date
     * @param {String | Date | object} value
     * @param {Date} defaultValue - The default value to return if conversion fails.
     * @returns {Date} - The converted Date object or the default value if conversion fails.
     *
     */
    let date;

    if (value === null || value === undefined) {
        return handleFailure(defaultValue, "Input value is null or undefined");
    }

    if (value instanceof Date) {
        return value; // It's already a Date object.
    }

    if (typeof value === "number") {
        date = new Date(value); //handles timestamps
        if (isNaN(date.getTime())) {
            return handleFailure(defaultValue, "Invalid numeric date value");
        }
        return date;
    }

    if (typeof value === "string") {
        // Attempt various date formats
        const formats = [
            // ISO 8601
            () => new Date(value),
            // Month/Day/Year
            () => {
                const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
                return match
                    ? new Date(`${match[3]}-${match[1]}-${match[2]}`)
                    : null;
            },
            // Day/Month/Year
            () => {
                const match = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
                return match
                    ? new Date(`${match[3]}-${match[2]}-${match[1]}`)
                    : null;
            },
            // Year/Month/Day
            () => {
                const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
                return match ? new Date(value) : null;
            },
            // Try parsing with Date.parse (more lenient, catches many formats)
            () => {
                const parsedDate = new Date(Date.parse(value));
                return isNaN(parsedDate.getTime()) ? null : parsedDate; // Check for invalid date
            },
        ];

        for (const format of formats) {
            date = format();
            if (date && !isNaN(date.getTime())) {
                return date;
            }
        }
    }

    // If all attempts fail, handle the error
    return handleFailure(
        defaultValue,
        `Could not convert value "${value}" to datetime.`,
    );
}

function toString(value, defaultValue) {
    /**
     * Converts a date to string
     * @param {String | Date | object} value
     * @return {Date} date
     */

    value = toDate(value, null);
    if (h.isNull(value)) {
        return handleFailure(
            defaultValue,
            `Could not convert "${value}" to string.`,
        );
    }

    let formattedDate = value.toLocaleString();

    return formattedDate;
}

function eq(date1, date2, defaultValue) {
    /**
     * Returns true if two dates are equal
     * @param {Date} date1
     * @param {Date} date2
     * @return {bool} isEqual
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    if (date1.getTime() == date2.getTime()) {
        return true;
    }
    return false;
}


function ne(date1, date2, defaultValue) {
    /**
     * Returns true if two dates are equal
     * @param {Date} date1
     * @param {Date} date2
     * @return {bool} isEqual
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    if (date1.getTime() == date2.getTime()) {
        return false;
    }
    return true;
}


function lt(date1, date2, defaultValue) {
    /**
     * Returns true if date1 is greater than date2
     * @param {Date} date1
     * @param {Date} date2
     * @return {bool} isGreater
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    return date1 < date2;
}

function gt(date1, date2, defaultValue) {
    /**
     * Returns true if date1 is greater than date2
     * @param {Date} date1
     * @param {Date} date2
     * @return {bool} isGreater
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    return date1 > date2;
}

function getDuration(date1, date2, defaultValue) {
    /**
     * Returns duration between two dates
     * @param {Date} date1
     * @param {Date} date2
     * @return {Number} duration
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    let startDate;
    let endDate;

    if (date1 < date2) {
        startDate = date1;
        endDate = date2;
    } else {
        startDate = date2;
        endDate = date1;
    }

    let duration = (endDate - startDate) / 1000;
    return duration;
}

function getDurationRecord(date1, date2, defaultValue) {
    /**
     * Returns duration between two dates
     * @param {Date} date1
     * @param {Date} date2
     * @return {Number} duration
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    let duration = getDuration(date1, date2);

    let result = {
        "@type": "QuantitativeValue",
        "@id": String(crypto.randomUUID()),
        unitCode: "SEC",
        unitText: "s",
        value: duration,
    };

    return result;
}

function getCurrentDateObject() {
    /**
     * Returns current date object
     * @return {Date} date
     *
     */
    let now = new Date();
    return now;
}

// -----------------------------------------------------
//  Human readable
// -----------------------------------------------------

function getHumanReadableDate(date, defaultValue) {
    /**
     * Returns human readable date
     * @param {Date} date
     * @return {String} date
     *
     */

    // Ensure it is date
    date = toDate(date, date);

    if (!isValid(date)) {
        return handleFailure(
            defaultValue,
            `Date "${date}" is not a date object.`,
        );
    }

    // If not date 2, assume date 2 is now

    const now = new Date();

    const targetDate = new Date(date);
    const diff = Math.abs(now - targetDate); // difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // approximation for months
    const years = Math.floor(days / 365); // approximation for years

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }
}

function getHumanReadableDuration(date1, date2, defaultValue) {
    /**
     * Returns human readable duration
     * @param {Date} startDate
     * @param {Date} endDate
     * @return {String} duration
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    let startDate = toDate(date1);
    let endDate = toDate(date2);

    if (h.isNull(startDate)) {
        return "";
    }
    if (h.isNull(endDate)) {
        return "";
    }

    const diffInMilliseconds = Math.abs(endDate - startDate);

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30.44; // Approximate value for a month
    const millisecondsInYear = millisecondsInDay * 365.25; // Account for leap years

    const years = Math.floor(diffInMilliseconds / millisecondsInYear);
    const months = Math.floor(
        (diffInMilliseconds % millisecondsInYear) / millisecondsInMonth,
    );
    const days = Math.floor(
        (diffInMilliseconds % millisecondsInMonth) / millisecondsInDay,
    );
    const hours = Math.floor(
        (diffInMilliseconds % millisecondsInDay) / millisecondsInHour,
    );
    const minutes = Math.floor(
        (diffInMilliseconds % millisecondsInHour) / millisecondsInMinute,
    );
    const seconds = Math.floor(
        (diffInMilliseconds % millisecondsInMinute) / millisecondsInSecond,
    );

    let duration = [];
    if (years) {
        return `${years} year${years > 1 ? "s" : ""}`;
    }
    if (months) {
        return `${months} month${months > 1 ? "s" : ""}`;
    }
    if (days) {
        return `${days} day${days > 1 ? "s" : ""}`;
    }
    if (hours) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    if (seconds) {
        return `${seconds} second${seconds >= 0 ? "s" : ""}`;
    }
    return "";
}

// -----------------------------------------------------
//  ISO
// -----------------------------------------------------

function toISODurationFromDates(date1, date2, defaultValue) {
    /**
     * Returns ISO duration from dates
     * @param {Date} startDate
     * @param {Date} endDate
     * @return {String} duration
     */

    // Ensure it is date
    date1 = toDate(date1, date1);
    date2 = toDate(date2, date2);

    if (!isValid(date1)) {
        return handleFailure(
            defaultValue,
            `Date1 "${date1}" is not a date object.`,
        );
    }

    if (!isValid(date2)) {
        return handleFailure(
            defaultValue,
            `Date2 "${date2}" is not a date object.`,
        );
    }

    let start = date1;
    let end = date2;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    // Handle negative values by adjusting the larger units
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const daysInPreviousMonth = new Date(
            end.getFullYear(),
            end.getMonth(),
            0,
        ).getDate();
        days += daysInPreviousMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // Construct ISO 8601 duration string
    let duration = "P";

    if (years > 0) duration += `${years}Y`;
    if (months > 0) duration += `${months}M`;
    if (days > 0) duration += `${days}D`;

    if (hours > 0 || minutes > 0 || seconds > 0) {
        duration += "T"; // Time part separator

        if (hours > 0) duration += `${hours}H`;
        if (minutes > 0) duration += `${minutes}M`;
        if (seconds > 0) duration += `${seconds}S`;
    }

    // If duration is empty, return P0D
    if (duration == "P"){
        duration = "P0D"
    }

    return duration;
}

function convertISODurationToEnglish(duration, defaultValue) {
    /**
     * Converts ISO duration to english
     * @param {String} duration
     * @return {String} duration
     *
     */

    const isoDurationRegex =
        /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
    const matches = duration.match(isoDurationRegex);

    if (!matches) {
        return "Invalid ISO 8601 duration";
    }

    const years = matches[1]
        ? `${matches[1]} year${matches[1] > 1 ? "s" : ""}`
        : "";
    const months = matches[2]
        ? `${matches[2]} month${matches[2] > 1 ? "s" : ""}`
        : "";
    const days = matches[3]
        ? `${matches[3]} day${matches[3] > 1 ? "s" : ""}`
        : "";
    const hours = matches[4]
        ? `${matches[4]} hour${matches[4] > 1 ? "s" : ""}`
        : "";
    const minutes = matches[5]
        ? `${matches[5]} minute${matches[5] > 1 ? "s" : ""}`
        : "";
    const seconds = matches[6]
        ? `${matches[6]} second${matches[6] > 1 ? "s" : ""}`
        : "";

    const parts = [years, months, days, hours, minutes, seconds].filter(
        Boolean,
    );

    if (parts.length === 0) {
        return "No duration specified";
    }

    return parts.join(", ");
}

function convertEnglishToISODuration(englishDuration, defaultValue) {
    /**
     * Converts english duration to ISO duration
     * @param {String} englishDuration
     * @return {String} duration
     *
     */


    if(h.isNull(englishDuration)){
        return handleFailure(defaultValue, "Cannot convert, input value is null or undefined")
    }


    const timeUnits = {
        year: "Y",
        years: "Y",
        month: "M",
        months: "M",
        day: "D",
        days: "D",
        hour: "H",
        hours: "H",
        minute: "M",
        minutes: "M",
        second: "S",
        seconds: "S",
    };

    let years = 0,
        months = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0;

    // Split the input into parts (e.g., ["2 years", "6 months"])
    const parts = englishDuration.split(",").map((part) => part.trim());

    parts.forEach((part) => {
        const [value, unit] = part.split(" ");
        const number = parseInt(value, 10);

        if (isNaN(number) || !timeUnits[unit.toLowerCase()]) {
            throw new Error("Invalid duration format");
        }

        switch (unit.toLowerCase()) {
            case "year":
            case "years":
                years = number;
                break;
            case "month":
            case "months":
                months = number;
                break;
            case "day":
            case "days":
                days = number;
                break;
            case "hour":
            case "hours":
                hours = number;
                break;
            case "minute":
            case "minutes":
                minutes = number;
                break;
            case "second":
            case "seconds":
                seconds = number;
                break;
        }
    });

    // Construct ISO 8601 duration string
    let isoDuration = "P";
    if (years) isoDuration += `${years}Y`;
    if (months) isoDuration += `${months}M`;
    if (days) isoDuration += `${days}D`;

    if (hours || minutes || seconds) {
        isoDuration += "T";
        if (hours) isoDuration += `${hours}H`;
        if (minutes) isoDuration += `${minutes}M`;
        if (seconds) isoDuration += `${seconds}S`;
    }

    // If duration is empty, return P0D
    if (isoDuration == "P"){
            isoDuration = "P0D"
    }


    return isoDuration || "P0D"; // Return P0D for no duration
}
