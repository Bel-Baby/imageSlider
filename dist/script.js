const defaultImageContainer = document.getElementById('defaultImageContainer');
const fetchedImageContainer = document.getElementById('fetchedImageContainer');
const shuffleDefImgs = document.getElementById('shuffleDefImgs');
const shuffleFetchedImgs = document.getElementById('shuffleFetchedImgs');
const nextDefImgs = document.getElementById('nextDefImgs');
const previousDefImgs = document.getElementById('previousDefImgs');
const nextFetImgs = document.getElementById('nextFetImgs');
const previousFetImgs = document.getElementById('previousFetImgs');

//Store default image paths in an obj.
const defaultImages = {
    boruShiki: './defaultImages/boruShiki.jpeg',
    yuji: './defaultImages/yuji.jpeg',
    boruto: './defaultImages/boruto.jpeg',
    cosplayNaruto: './defaultImages/cosplayNaruto.jpeg',
    cosplaySasuke: './defaultImages/cosplaySasuke.jpeg',
    rockLee: './defaultImages/rockLee.jpeg',
    gojo: './defaultImages/gojo.jpeg',
    light: './defaultImages/light.jpeg',
    luffy: './defaultImages/luffy.jpeg',
    makiZenin: './defaultImages/makiZenin.jpeg',
    nanami: './defaultImages/nanami.jpeg',
    strHashira: './defaultImages/strHashira.jpeg',
    tanjiro: './defaultImages/tanjiro.jpeg',
    yuji: './defaultImages/yuji.jpeg',
    nobaraKugisaki: './defaultImages/nobaraKugisaki.jpeg',
}

//loop through the default image obj and create img tags with the keys for each path.
Object.keys(defaultImages).forEach(images => {
    const img = document.createElement('img');
    img.src = defaultImages[images];
    img.classList.add('lg:h-72');
    img.classList.add('h-48');
    img.classList.add('lg:w-60');
    img.classList.add('w-36');
    defaultImageContainer.appendChild(img);
});

let startIndex = 0;
let endIndex = 15;
let imgArr = [];

fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => {
        if (!res.ok) throw new Error('Unable to fetch images');
        return res.json();
    })
    .then(data => {
        imgArr = data;
        imgArr.slice(startIndex, endIndex).forEach(images => {
            const img = document.createElement('img');
            img.src = images.thumbnailUrl;
            img.classList.add('lg:h-72');
            img.classList.add('h-48');
            img.classList.add('lg:w-60');
            img.classList.add('w-36');
            fetchedImageContainer.appendChild(img);
        })
    })
    .catch(err => {
        console.warn(err.message);
    });


// Function to shuffle.
const shuffle = (arr) => {
    return arr.slice().sort(() => Math.random() - 0.5);
}

// Function to move to next image.
const shiftAndConcat = (arr) => {
    let shiftedArrVal = arr.shift();
    return arr.concat(shiftedArrVal);
    // const arr = [1,2,3,4,5];
    // let shiftedArrVal = arr.shift();
    // console.log(shiftedArrVal);
    // console.log(arr);
    // console.log(arr.concat(shiftedArrVal));
}
//shiftAndConcat();

// Function to move to previous image.
const popAndConcat = (arr) => {
    let poppedArrVal = arr.pop();
    return [poppedArrVal].concat(arr);
    // const arr = [1,2,3,4,5];
    // let poppedArrVal = arr.pop();
    // console.log(poppedArrVal);
    // console.log(arr);
    // console.log([poppedArrVal].concat(arr));
}
//popAndConcat();

// Function to shuffle default image tags.
const shuffleDefaultImages = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img')); // Convert to array
    const shuffledTags = shuffle(defImgTags);
    defaultImageContainer.innerHTML = ''; //Clear previous images order in this img container to replace the order with the shuffled ones.
    shuffledTags.forEach(img => defaultImageContainer.appendChild(img));//Replace the images order in the container.
}

// Function to shuffle fetched images.
const shuffleFetchedImages = () => {
    const fetImgTags = Array.from(fetchedImageContainer.querySelectorAll('img')); // Convert to array
    const shuffledTags = shuffle(fetImgTags);
    fetchedImageContainer.innerHTML = ''; //Clear previous images order in this img container to replace the order with the shuffled ones.
    shuffledTags.forEach(img => fetchedImageContainer.appendChild(img));//Replace the images order in the container.
}

const nextDefaultImage = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img'));
    const nextOrder = shiftAndConcat(defImgTags);
    defaultImageContainer.innerHTML = '';
    nextOrder.forEach(img => defaultImageContainer.appendChild(img));
}

const nextFetchedImage = () => {
    const fetImgTags = Array.from(fetchedImageContainer.querySelectorAll('img'));
    const nextOrder = shiftAndConcat(fetImgTags);
    fetchedImageContainer.innerHTML = '';
    nextOrder.forEach(img => fetchedImageContainer.appendChild(img));
}

const previousDefaultImage = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img'));
    const previousOrder = popAndConcat(defImgTags);
    defaultImageContainer.innerHTML = '';
    previousOrder.forEach(img => defaultImageContainer.appendChild(img));
}

const previousFetchedImage = () => {
    const fetImgTags = Array.from(fetchedImageContainer.querySelectorAll('img'));
    const previousOrder = popAndConcat(fetImgTags);
    fetchedImageContainer.innerHTML = '';
    previousOrder.forEach(img => fetchedImageContainer.appendChild(img));
}


//Set timeout to change to next default image.
setTimeout(() => {
    setInterval(nextDefaultImage, 5000);
}, 1000);

//Set timeout to change to next fetched image.
setTimeout(() => {
    setInterval(nextFetchedImage, 5000);
}, 1000);

// Add event listener (click) to the shuffleDefImgs button.
shuffleDefImgs.addEventListener('click', shuffleDefaultImages);

shuffleFetchedImgs.addEventListener('click', shuffleFetchedImages);

nextDefImgs.addEventListener('click', nextDefaultImage);

nextFetImgs.addEventListener('click', nextFetchedImage);

previousDefImgs.addEventListener('click', previousDefaultImage);

previousFetImgs.addEventListener('click', previousFetchedImage);