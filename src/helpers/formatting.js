import {ethers} from 'ethers';
import moment from "moment";


const web3Format = (web3RetunValue) => {
    return Number(Math.floor(Number(ethers.utils.formatEther(web3RetunValue)) * 100) / 100).toFixed(2);
}

const secondFormat = (seconds, separator = false) => {
    let formatString = ''
    if (separator) formatString += ' - ';
    let dayFormat = parseInt(moment.duration(seconds, 'seconds').asDays())
    let hourFormat = parseInt(moment.duration(seconds, 'seconds').asHours()) % 24

    let dayString = 'days'
    let hourString = 'hours'

    if (dayFormat === 1) dayString = 'day';
    if (hourFormat === 1) hourString = 'hour';

    if (dayFormat && hourFormat) {
        formatString += dayFormat + ' ' + dayString + ', and ' + hourFormat + ' ' + hourString
    } else if (dayFormat) {
        formatString += dayFormat + ' ' + dayString
    } else if (hourFormat) {
        formatString += hourFormat + ' ' + hourString
    } else {
        return ''
    }

    return formatString
}

const dateFormat = (seconds, separator = false) => {
    let formatString = ''
    if (separator) formatString += ' - ';
    if (!seconds) return ''
    formatString += moment(seconds * 1000).format('llll')
    return formatString
}

const slugify = (text) => {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
    const to = "aaaaaeeeeeiiiiooooouuuunc------"

    const newText = text.split('').map(
        (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

    return newText
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-y-')           // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}


export default {
    web3Format,
    slugify,
    secondFormat,
    dateFormat
}