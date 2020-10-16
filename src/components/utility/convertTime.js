export default function convertTime(duration) {
    const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
    const extracted = time_extractor.exec(duration);
    let hours = parseInt(extracted[1], 10) || 0;
    let minutes = parseInt(extracted[2], 10) || 0;
    let seconds = parseInt(extracted[3], 10) || 0;

    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}