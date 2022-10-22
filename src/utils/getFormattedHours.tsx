export default function getFormattedHours(date: string): string {
  let formattedHours: string | number = new Date(date).getHours();

  if (formattedHours < 10) {
    formattedHours = `0${formattedHours}:00`;
  } else {
    formattedHours = `${formattedHours}:00`;
  }

  return formattedHours;
}
