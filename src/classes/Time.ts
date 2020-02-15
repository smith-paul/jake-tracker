type AgoInterval =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';
type Ago = { [K in AgoInterval]: number };

export default class Time {
  epoch: number;
  date: string;
  time: string;
  ago: Ago;
  weekPosition: number;
  dayPosition: number;

  static now() {
    return new Date().getTime();
  }

  constructor(epoch: number) {
    const D = new Date(epoch);
    this.epoch = epoch;
    this.date = D.toLocaleDateString();
    this.time = D.toLocaleTimeString();
    const ago = Time.now() - epoch;
    const seconds = Math.floor(ago / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.5);
    const years = Math.floor(days / 365);
    this.ago = {
      seconds,
      minutes,
      hours,
      days,
      weeks,
      months,
      years,
    };
    this.weekPosition = D.getDay() / 7;
    this.dayPosition =
      D.getHours() / 24 +
      D.getMinutes() / 60 / 24 +
      D.getSeconds() / 60 / 60 / 24;
  }

  agoInWords() {
    const s = (number: number) => (number === 1 ? '' : 's');
    const { seconds, minutes, hours, days, weeks, months, years } = this.ago;
    const t = (text: string, number: number) =>
      `over ${number} ${text}${s(number)} ago`;
    if (years > 0) return t('year', years);
    if (months > 0) return t('month', months);
    if (weeks > 0) return t('week', weeks);
    if (days > 0) return t('day', days);
    if (hours > 0) return t('hour', hours);
    if (minutes > 0) return t('minute', minutes);
    return t('second', seconds);
  }
}
