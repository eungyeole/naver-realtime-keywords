export function koreandateFormat(time: Date = new Date()) {
  const isUnder10 = (num: number) => (num < 10 ? `0${num}` : num);

  const month = isUnder10(time.getMonth() + 1);
  const date = isUnder10(time.getDate());
  const hours = isUnder10(time.getHours());
  const minutes = isUnder10(time.getMinutes());
  return `${month}. ${date}. ${hours}:${minutes}`;
}
