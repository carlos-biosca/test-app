  const convertTime = (seconds: number): string => {
    let date: string | Date = new Date(seconds * 1000);
    date = date.toLocaleTimeString();
    date = date.substring(0, date.length-3);
    date = date.padStart(5, '0');
    return date;
  }

  export default convertTime;
