//review__artwork

const reviews = document.querySelectorAll('.review');

console.log('Thumbnails: ' + reviews?.length);

// `document.querySelector` may return null if the selector doesn't match anything.
if (reviews?.length) {
  reviews.forEach((review) => {
    const ratingBadge = document.createElement('div');
    // TODO: implement style that matches Pitchfork review page
    ratingBadge.style.cssText = `
      width: 40px; 
      height: 40px; 
      background-color: red; 
      border: solid 2px red; 
      border-radius: 20px; 
      text-align: center; 
      padding-top: 10px; 
      font-size: 1.5em;
    `;
    // TODO: fetch actual review and grab rating
    ratingBadge.textContent = "8.5";

    review.insertAdjacentElement('beforeend', ratingBadge);
  });

  // Original code from Google sample "readingTime" extension:
  /*
  const text = article.textContent;

  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  // Use the same styling as the publish information in an article's header
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector('h1');
  // Support for article docs with date
  const date = article.querySelector('time')?.parentNode;

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
  (date ?? heading).insertAdjacentElement('afterend', badge);
  */
}