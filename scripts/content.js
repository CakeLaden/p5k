//review__artwork

const reviews = document.querySelectorAll('.review');

console.log('Thumbnails: ' + reviews?.length);

// `document.querySelector` may return null if the selector doesn't match anything.
if (reviews?.length) {
  reviews.forEach((review) => {
    const ratingBadge = document.createElement(`div`);
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
    fetch(new Request(`https://pitchfork.com/reviews/albums/jake-muir-bathhouse-blues/`))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.blob();
      })
      .then((response) => {
        myImage.src = URL.createObjectURL(response);
      });


    ratingBadge.textContent = `8.5`;

    review.insertAdjacentElement(`beforeend`, ratingBadge);
  });
}