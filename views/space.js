function contentLoader() {
    sendApiRequest();
}

async function sendApiRequest() {
    let APIKEY = 'rlCEAXjqD1MV3KemE089QpV6r6j5gBeorm8GSWB3';
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKEY}`);
    console.log(response);
    let data = await response.json();
    console.log(data);
    useApiData(data);
};

function useApiData(data) {
    document.querySelector("#title").innerHTML += data.title;
    document.querySelector("#content").innerHTML += `img.main-img(src='${data.url}')`;
    document.querySelector("#content").innerHTML += data.explanation;

}
