export default class Time {
  static now() {
    return new Date().getTime();
  }

  constructor(epoch) {
    const D = new Date(epoch);
    this.epoch = epoch;
    this.date = D.toLocaleDateString();
    this.time = D.toLocaleTimeString();
    const ago = Time.now() - epoch;
    this.ago = { seconds: Math.floor(ago / 1000) };
    this.ago.minutes = Math.floor(this.ago.seconds / 60);
    this.ago.hours = Math.floor(this.ago.minutes / 60);
    this.ago.days = Math.floor(this.ago.hours / 24);
    this.ago.weeks = Math.floor(this.ago.days / 7);
    this.ago.months = Math.floor(this.ago.days / 30.5);
    this.ago.years = Math.floor(this.ago.days / 365);
    this.weekPosition = D.getDay() / 7;
    this.dayPosition =
      D.getHours() / 24 +
      D.getMinutes() / 60 / 24 +
      D.getSeconds() / 60 / 60 / 24;
  }

  agoInWords() {
    const s = number => (number === 1 ? "" : "s");
    const { seconds, minutes, hours, days, weeks, months, years } = this.ago;
    const t = (text, number) => `over ${number} ${text}${s(number)} ago`;
    if (years > 0) return t("year", years);
    if (months > 0) return t("month", months);
    if (weeks > 0) return t("week", weeks);
    if (days > 0) return t("day", days);
    if (hours > 0) return t("hour", hours);
    if (minutes > 0) return t("minute", minutes);
    return t("second", seconds);
  }
}
