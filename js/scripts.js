function getAPI(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}


function discover(page) {
    let language = 'pt-Br';
    let data = getAPI(`https://api.themoviedb.org/3/discover/movie?api_key=1ccb3848ed485c17f4e8e9741097d75a&language=${language}&page=${page}`);
    const content = JSON.parse(data);
    const arrayData = content.results.map(el => {
        return {
            id: el.id,
            title: el.title,
            img: `https://image.tmdb.org/t/p/w500${el.backdrop_path}`
        }
    })

    return arrayData
}

function gridDiscover(i) {
    let elements = discover(i);
    let grid = document.getElementById('grid');
    let grid_delete = document.createElement('div');
    const imgList = elements.map(el => el.img);
    const titleList = elements.map(el => el.title);
    let count = 0;
    grid_delete.classList.add('grid');
    grid_delete.id = 'grid_delete';
    grid.appendChild(grid_delete);
    imgList.forEach(element => {

        grid_delete.appendChild(criaDIV(imgList, titleList, count));
        count++;
    })


    function criaDIV(img, title, count) {
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let nome_filme = document.createElement('h4')
        div2.id = 'div';
        nome_filme.innerHTML = title[count];
        div1.appendChild(listImg(img, count));
        div2.appendChild(div1);
        div1.classList.add('hover_img');
        div1.appendChild(nome_filme);
        return div2;
    }

    function listImg(obj, count) {
        let srcImg = document.createElement('img');
        srcImg.classList.add('item');
        srcImg.src = obj[count];
        return srcImg;
    }


}

let pageAtual = 1;

function pageIncrement() {
    pageAtual++;
    let grid = document.getElementById('grid');
    let grid_delete = document.getElementById('grid_delete');
    grid.removeChild(grid_delete);
    gridDiscover(pageAtual);
}

function pageDecrement() {
    if (pageAtual > 1) {
        pageAtual--;
    }
    let grid = document.getElementById('grid');
    let grid_delete = document.getElementById('grid_delete');
    grid.removeChild(grid_delete);
    gridDiscover(pageAtual);
}

gridDiscover(pageAtual);