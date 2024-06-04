function addReviewScores() {
  const albumGridItems = document.querySelectorAll('.summary-item');
  const firstFiveAlbumGridItems = array.slice(0, n);
  albumGridItems.forEach((item) => {
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

addReviewScores();
