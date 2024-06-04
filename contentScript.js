function addReviewScores() {
  const albumGridItems = document.querySelectorAll('.review-grid__item');
  albumGridItems.forEach((item) => {
    const albumLink = item.querySelector('.review-grid__item__link');
    const artistName = item.querySelector('.review-grid__item__artist');
    fetch(albumLink.href)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const scoreCircle = doc.querySelector('div[class^="ScoreCircle-"]');
        const rating = scoreCircle.querySelector('p[class^="Rating-"]');
        const reviewScore = rating.textContent;
        const reviewScoreParagraph = document.createElement('p');
        reviewScoreParagraph.textContent = reviewScore;
        artistName.parentNode.insertBefore(reviewScoreParagraph, artistName.nextSibling);
      })
      .catch((error) => console.error(error));
  });
}

addReviewScores();