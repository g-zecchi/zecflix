function getAPI(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}


function discover(page) {
    let language = 'pt-br';
    let data = getAPI(`https://api.themoviedb.org/3/discover/movie?api_key=1ccb3848ed485c17f4e8e9741097d75a&language=${language}&page=${page}`);
    const content = JSON.parse(data);
    const arrayData = content.results.map(el => {
        return {
            id: el.id,
            title: el.title,
            img: `https://image.tmdb.org/t/p/original${el.backdrop_path}`
        }
    })

    return arrayData
}

function gridDiscover(i) {
    let elements = discover(i);
    let grid = document.getElementById('grid');
    const imgList = elements.map(el => el.img)
    let count = 0;
    imgList.forEach(element => {

        grid.appendChild(listImg(imgList, count));
        count++;
    })
    console.log(elements)

    function listImg(obj, count) {
        let srcImg = document.createElement('img');
        srcImg.src = obj[count];
        srcImg.innerHTML = srcImg.src;
        return srcImg;
    }
}



gridDiscover(1);