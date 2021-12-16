export function toPrettyDate(timestamp) {
    var date = new Date(timestamp);
    return date.toISOString().replace('T',' ').slice(0, 23);
}