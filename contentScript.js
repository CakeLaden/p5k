let albumIndex = 0;
const albumsPerBatch = 3;
const albumReviewSelector = '.summary-item';
const customReviewScoreClass = 'p5k-review-score';

function addReviewScores() {
  const albumGridItems = document.querySelectorAll(albumReviewSelector);
  const albumBatch = Array.from(albumGridItems).slice(albumIndex, albumIndex + albumsPerBatch);
  const promises = albumBatch.map((item) => {
    if (item.querySelector(`.${customReviewScoreClass}`)) {
      // skip if we already have a review score
      return Promise.resolve();
    }
    const albumLink = item.querySelector('.summary-item__image-link');
    const artistName = item.querySelector('.summary-item__sub-hed');
    return fetch(albumLink.href)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rating = doc.querySelector('div[class^="ScoreCircle-"] p');
        if (rating) {
          // no review score?  could be a track review...or Pitchfork changed their HTML structure :/
          const reviewScore = rating.textContent;
          const reviewScoreParagraph = document.createElement('p');
          reviewScoreParagraph.classList.add(customReviewScoreClass);
          reviewScoreParagraph.textContent = reviewScore;
          artistName.parentNode.insertBefore(reviewScoreParagraph, artistName.nextSibling);
        }
      })
      .catch((error) => console.error(error));
  });
  return Promise.all(promises);
}

function addLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = `Load ${albumsPerBatch} More Ratings`;
  loadMoreButton.style.position = 'fixed';
  loadMoreButton.style.bottom = '5rem';
  loadMoreButton.style.right = '1.25rem';
  loadMoreButton.style.padding = '10px 20px';
  loadMoreButton.style.fontSize = '1rem';
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

function addLoadAllButton() {
  const loadAllButton = document.createElement('button');
  loadAllButton.textContent = `Load All Ratings`;
  loadAllButton.style.position = 'fixed';
  loadAllButton.style.bottom = '1.25rem';
  loadAllButton.style.right = '1.25rem';
  loadAllButton.style.padding = '10px 20px';
  loadAllButton.style.fontSize = '1rem';
  loadAllButton.style.background = '#4CAF50';
  loadAllButton.style.color = '#fff';
  loadAllButton.style.border = 'none';
  loadAllButton.style.borderRadius = '5px';
  loadAllButton.style.cursor = 'pointer';
  loadAllButton.style.zIndex = '9999';
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
  loadAllButton.appendChild(loadingSpinner);
  loadAllButton.addEventListener('click', () => {
    const allAlbums = document.querySelectorAll(albumReviewSelector);
    albumIndex = allAlbums.length; // Set to total number of albums
    loadingSpinner.style.display = 'flex';
    
    // Create a function to process albums in batches
    const processAllAlbums = async () => {
      const originalIndex = albumIndex;
      albumIndex = 0; // Reset index to start from beginning
      
      while (albumIndex < originalIndex) {
        await addReviewScores();
        albumIndex += albumsPerBatch;
      }
    };

    processAllAlbums().then(() => {
      loadingSpinner.style.display = 'none';
    });
  });
  document.body.appendChild(loadAllButton);
}

addReviewScores();
addLoadMoreButton();
addLoadAllButton();

// Remove ads every second for the first 10 seconds of page load
let adBlockAttempt = 0, maxAdBlockAttempts = 10;
const adBlockInterval = setInterval(() => {
  const adSelectors = [
    '.ad', '.ads', '.advert', '.advertisement', '.ad-wrapper', '.ad-container',
    '.google-ad', '.ad-placeholder', '.ad-unit', '.ad-space', '.ad-slot',
  ];
  adSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((ad) => {
      ad.remove();
    });
  });

  adBlockAttempt += 1;
  console.log('ad block loop index ' + adBlockAttempt);
  if (adBlockAttempt >= maxAdBlockAttempts) {
    clearInterval(adBlockInterval);
  }
}, 1000);