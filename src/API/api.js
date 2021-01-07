export  const apiHelper = (url) => {
  const dataFetched = fetch(url)
    .then(res => res.json())
    return dataFetched;

}
