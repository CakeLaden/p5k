let albumIndex = 0;
const albumsPerPage = 6;

function addReviewScores() {
  const albumGridItems = document.querySelectorAll('.summary-item');
  const albumSlice = Array.prototype.slice.call(albumGridItems, albumIndex, albumIndex + albumsPerPage);
  albumSlice.forEach((item) => {
    const albumLink = item.querySelector('.summary-item__image-link');
    const artistName = item.querySelector('.summary-item__sub-hed');
    fetch(albumLink.href)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rating = doc.querySelector('div[class^="ScoreCircle-"] p');
        const reviewScore = rating.textContent;
        const reviewScoreParagraph = document.createElement('p');
        reviewScoreParagraph.textContent = reviewScore;
        artistName.parentNode.insertBefore(reviewScoreParagraph, artistName.nextSibling);
      })
      .catch((error) => console.error(error));
  });
}

function addMoreButton() {
  const moreButton = document.createElement('button');
  moreButton.textContent = 'Load more albums';
  moreButton.addEventListener('click', () => {
    albumIndex += albumsPerPage;
    addReviewScores();
  });
  document.body.insertBefore(moreButton, document.body.firstChild);
}

addReviewScores();
addMoreButton();