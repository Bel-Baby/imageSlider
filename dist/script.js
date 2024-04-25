const defaultImageContainer = document.getElementById('defaultImageContainer');
const shuffleDefImgs = document.getElementById('shuffleDefImgs');
const nextDefImgs = document.getElementById('nextDefImgs');
const previousDefImgs = document.getElementById('previousDefImgs');

//Store default image paths in an obj.
const defaultImages = [
    './defaultImages/boruShiki.jpeg',
    './defaultImages/yuji.jpeg',
    './defaultImages/boruto.jpeg',
    './defaultImages/cosplayNaruto.jpeg',
    './defaultImages/cosplaySasuke.jpeg',
    './defaultImages/rockLee.jpeg',
    './defaultImages/gojo.jpeg',
    './defaultImages/light.jpeg',
    './defaultImages/luffy.jpeg',
    './defaultImages/makiZenin.jpeg',
    './defaultImages/nanami.jpeg',
    './defaultImages/strHashira.jpeg',
    './defaultImages/tanjiro.jpeg',
    './defaultImages/yuji.jpeg',
    './defaultImages/nobaraKugisaki.jpeg',
];

//loop through the default image obj and create img tags with the keys for each path.
defaultImages.forEach(images => {
    const img = document.createElement('img');
    img.src = images;
    img.classList.add('lg:h-72');
    img.classList.add('h-32');
    img.classList.add('lg:w-60');
    img.classList.add('w-20');
    img.classList.add('object-fill');
    defaultImageContainer.appendChild(img);
});


// Function to shuffle.
const shuffle = (arr) => {
    return arr.slice().sort(() => Math.random() - 0.5);
}

// Function to move to next image.
const shiftAndConcat = (arr) => {
    let shiftedArrVal = arr.shift();
    return arr.concat(shiftedArrVal);
}

// Function to move to previous image.
const popAndConcat = (arr) => {
    let poppedArrVal = arr.pop();
    return [poppedArrVal].concat(arr);
}

// Function to shuffle default image tags.
const shuffleDefaultImages = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img')); // Convert to array
    const shuffledTags = shuffle(defImgTags);
    defaultImageContainer.innerHTML = ''; //Clear previous images order in this img container to replace the order with the shuffled ones.
    shuffledTags.forEach(img => defaultImageContainer.appendChild(img));//Replace the images order in the container.
}


const nextDefaultImage = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img'));
    const nextOrder = shiftAndConcat(defImgTags);
    defaultImageContainer.innerHTML = '';
    nextOrder.forEach(img => defaultImageContainer.appendChild(img));
}


const previousDefaultImage = () => {
    const defImgTags = Array.from(defaultImageContainer.querySelectorAll('img'));
    const previousOrder = popAndConcat(defImgTags);
    defaultImageContainer.innerHTML = '';
    previousOrder.forEach(img => defaultImageContainer.appendChild(img));
}

// Add event listener (click) to the shuffleDefImgs button.
shuffleDefImgs.addEventListener('click', shuffleDefaultImages);

nextDefImgs.addEventListener('click', nextDefaultImage);

previousDefImgs.addEventListener('click', previousDefaultImage);
