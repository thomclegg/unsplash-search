const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const accessKey =  "ac4950b83f5d32755d3a51b06b761bb3c27d1de50f5b3b57b2a019f9a2a9a93d"
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="


const searchUnsplash = function (term) {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      "Authorization": "Client-ID " + accessKey
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // format unsplash's results to fit our needs
      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular
        }
      })
    })
}

// add results to the page

const addResults = function (results) {
  // remove all the loading tags
  resultsTag.innerHTML = ""

  // loop over each individual result and add to the results tag
  results.forEach(results => {
    resultsTag.innerHTML = resultsTag.innerHTML + `
      <div class="single-result">
        <img src="${results.imageSrc}">
      </div>
    `
  })
}



// when we submit the form,
formTag.addEventListener("submit", function (event) {

  // get info from input
  const searchTerm = inputTag.value

  searchUnsplash(searchTerm)
    .then(results => {
      addResults(results)
    })

  // stop the form from going to the usual page
  event.preventDefault()
})
