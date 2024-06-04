let albumIndex = 0;
const albumsPerBatch = 6;

function addReviewScores() {
  const albumGridItems = document.querySelectorAll('.summary-item');
  const albumBatch = Array.from(albumGridItems).slice(albumIndex, albumIndex + albumsPerBatch);
  albumBatch.forEach((item) => {
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

function addLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load more albums';
  loadMoreButton.addEventListener('click', () => {
    albumIndex += albumsPerBatch;
    addReviewScores();
  });
  document.body.insertBefore(loadMoreButton, document.body.firstChild);
}

addReviewScores();
addLoadMoreButton();