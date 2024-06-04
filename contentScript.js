let albumIndex = 0;
const albumsPerBatch = 3;

function addReviewScores() {
  const albumGridItems = document.querySelectorAll('.summary-item');
  const albumBatch = Array.from(albumGridItems).slice(albumIndex, albumIndex + albumsPerBatch);
  const promises = albumBatch.map((item) => {
    const albumLink = item.querySelector('.summary-item__image-link');
    const artistName = item.querySelector('.summary-item__sub-hed');
    return fetch(albumLink.href)
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
  return Promise.all(promises);
}

function addLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Load More Ratings';
  loadMoreButton.style.position = 'fixed';
  loadMoreButton.style.bottom = '20px';
  loadMoreButton.style.right = '20px';
  loadMoreButton.style.padding = '10px 20px';
  loadMoreButton.style.fontSize = '16px';
  loadMoreButton.style.background = '#4CAF50';
  loadMoreButton.style.color = '#fff';
  loadMoreButton.style.border = 'none';
  loadMoreButton.style.borderRadius = '5px';
  loadMoreButton.style.cursor = 'pointer';
  loadMoreButton.style.zIndex = '9999';
  const loadingSpinner = document.createElement('div');
  loadingSpinner.style.display = 'none';
  loadingSpinner.style.position = 'absolute';
  loadingSpinner.style.top = '50%';
  loadingSpinner.style.transform = 'translateY(-50%)';
  loadingSpinner.style.width = '25px';
  loadingSpinner.style.height = '25px';
  loadingSpinner.style.background = 'rgba(0, 0, 0, 0.7)';
  loadingSpinner.style.borderRadius = '50%';
  loadingSpinner.style.justifyContent = 'center';
  loadingSpinner.style.alignItems = 'center';
  const spinner = document.createElement('div');
  spinner.style.width = '20px';
  spinner.style.height = '20px';
  spinner.style.border = '3px solid #fff';
  spinner.style.borderTopColor = '#4CAF50';
  spinner.style.borderRadius = '50%';
  spinner.style.animation = 'spin 1s linear infinite';
  loadingSpinner.appendChild(spinner);
  loadMoreButton.appendChild(loadingSpinner);
  loadMoreButton.addEventListener('click', () => {
    albumIndex += albumsPerBatch;
    loadingSpinner.style.display = 'flex';
    addReviewScores().then(() => {
      loadingSpinner.style.display = 'none';
    });
  });
  document.body.appendChild(loadMoreButton);
}

addReviewScores();
addLoadMoreButton();