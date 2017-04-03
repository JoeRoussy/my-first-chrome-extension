const dogImages = [
    "https://httpstatusdogs.com/img/100.jpg",
    "https://httpstatusdogs.com/img/200.jpg",
    "https://httpstatusdogs.com/img/201.jpg",
    "https://httpstatusdogs.com/img/202.jpg",
    "https://httpstatusdogs.com/img/203.jpg",
    "https://httpstatusdogs.com/img/206.jpg",
    "https://httpstatusdogs.com/img/207.jpg",
    "https://httpstatusdogs.com/img/226.jpg",
    "https://httpstatusdogs.com/img/304.jpg",
    "https://httpstatusdogs.com/img/308.jpg",
    "https://httpstatusdogs.com/img/402.jpg",
    "https://httpstatusdogs.com/img/401.jpg",
    "https://httpstatusdogs.com/img/405.jpg",
    "https://httpstatusdogs.com/img/411.jpg",
    "https://httpstatusdogs.com/img/413.jpg",
    "https://httpstatusdogs.com/img/414.jpg",
    "https://httpstatusdogs.com/img/420.jpg",
    "https://httpstatusdogs.com/img/422.jpg",
    "https://httpstatusdogs.com/img/423.jpg",
    "https://httpstatusdogs.com/img/429.jpg",
    "https://httpstatusdogs.com/img/500.jpg",
    "https://httpstatusdogs.com/img/502.jpg",
    "https://httpstatusdogs.com/img/504.jpg",
    "https://httpstatusdogs.com/img/508.jpg"
];

let hasDogImages = false;
let firstIteration = true;
const images = document.querySelectorAll('img');

images.forEach(image => image.setAttribute('data-original-src', image.src));

window.addEventListener('resize', () => {
    // Need to return all the images to normal and remove inline styles
    images.forEach(image => {
        if (image.style.width) {
            image.style.width = '';
        }

        if (image.style.height) {
            image.style.height = '';
        }

        const originalImageSrc = image.getAttribute('data-original-src');

        if (image.src !== originalImageSrc) {
            image.src = originalImageSrc;
        }
    });

    hasDogImages = false;
    firstIteration = true;
});

function toggleImages() {
    images.forEach(image => {
        const imageWidth = image.clientWidth;
        const imageHeight = image.clientHeight;
        const aspectRatio = Math.abs(imageHeight/imageWidth);

        if (firstIteration) {
            // Set the width of the image based on it's current size
            image.style.width = imageWidth;
            image.style.height = imageHeight;
        }

        // Only swap the images if it is square enough
        if (aspectRatio < 2 && aspectRatio > 0.5) {
            if (hasDogImages) {
                // Return image to normal
                image.src = image.getAttribute('data-original-src');
            } else {
                // Set image to random dog
                const randomIndex = Math.round(Math.random() * dogImages.length);
                image.src = dogImages[randomIndex];
            }
        }
    });

    if (firstIteration) {
        firstIteration = false;
    }

    hasDogImages = !hasDogImages;
}

chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'TOGGLE_DOGS_MSG') {
        toggleImages();
    }
});
