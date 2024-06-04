function addReviewLinks() {
  const albumGridItems = document.querySelectorAll('.review-grid__item');
  albumGridItems.forEach((item) => {
    const albumLink = item.querySelector('.review-grid__item__link');
    const artistName = item.querySelector('.review-grid__item__artist');
    const reviewLinkParagraph = document.createElement('p');
    reviewLinkParagraph.textContent = albumLink.href;
    artistName.parentNode.insertBefore(reviewLinkParagraph, artistName.nextSibling);
  });
}

addReviewLinks();