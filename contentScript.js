function addReviewLinks() {
  const albumGridItems = document.querySelectorAll('.summary-item');
  albumGridItems.forEach((item) => {
    const albumLink = item.querySelector('.summary-item__image-link');
    const artistName = item.querySelector('.summary-item__sub-hed');
    const reviewLinkParagraph = document.createElement('p');
    reviewLinkParagraph.textContent = albumLink.href;
    artistName.parentNode.insertBefore(reviewLinkParagraph, artistName.nextSibling);
  });
}

addReviewLinks();