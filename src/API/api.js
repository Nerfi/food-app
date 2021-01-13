//the comnsumer will deal with the error

export const apiHelper = (url) => {
  return fetch(url)
    .then(res => res.json());
}
