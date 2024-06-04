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
  loadMoreButton.addEventListener('click', () => {
    albumIndex += albumsPerBatch;
    addReviewScores();
    loadMoreButton.disabled = true;
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.position = 'fixed';
    loadingSpinner.style.top = '50%';
    loadingSpinner.style.left = '50%';
    loadingSpinner.style.transform = 'translate(-50%, -50%)';
    loadingSpinner.style.width = '50px';
    loadingSpinner.style.height = '50px';
    loadingSpinner.style.background = 'rgba(0, 0, 0, 0.7)';
    loadingSpinner.style.borderRadius = '50%';
    loadingSpinner.style.display = 'flex';
    loadingSpinner.style.justifyContent = 'center';
    loadingSpinner.style.alignItems = 'center';
    const spinner = document.createElement('div');
    spinner.style.width = '25px';
    spinner.style.height = '25px';
    spinner.style.border = '3px solid #fff';
    spinner.style.borderTopColor = '#4CAF50';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    loadingSpinner.appendChild(spinner);
    document.body.appendChild(loadingSpinner);
    setTimeout(() => {
      loadMoreButton.disabled = false;
      loadingSpinner.remove();
    }, 2000);
  });
  document.body.appendChild(loadMoreButton);
}

addReviewScores();
addLoadMoreButton();