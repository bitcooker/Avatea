import {ethers} from 'ethers';


const web3Format = (web3RetunValue) => {
    return Number(Math.floor(Number(ethers.utils.formatEther(web3RetunValue)) * 100) / 100).toFixed(2);
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
    slugify
}