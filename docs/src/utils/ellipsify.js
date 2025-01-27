export default function ellipsify(str) {
    const maxLength = 12
    if (str.length <= maxLength) {
        return str;
    }

    const partLength = Math.floor((maxLength - 3) / 2);
    return str.substring(0, partLength) + '...' + str.substring(str.length - partLength);
}