class Time {
  static convertToTime(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const hoursString = hours > 0 ? `${hours}:` : "";
    const minutesString = minutes > 0 ? `${minutes}:` : "0:";
    const secondsString = seconds > 0 ? `${seconds}` : "00";

    return `${hoursString}${minutesString}${secondsString}`;
  }
}

export default Time;
