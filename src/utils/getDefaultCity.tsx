export function getDefaultCity() {
  let city = 'minsk';

  if (!localStorage.defaultCity) {
    localStorage.setItem('defaultCity', city);
  } else {
    city = localStorage.getItem('defaultCity') || city;
  }

  return city;
}
