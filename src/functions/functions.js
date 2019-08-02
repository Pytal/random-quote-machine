function trigger(classSelector, siblingElem, transitionElem) {
  const card = document.querySelector(transitionElem);
  const quoteBtn = document.querySelector(siblingElem);
  card.addEventListener('transitionend', () => quoteBtn.classList.remove(classSelector));
  quoteBtn.classList.add(classSelector);
};

function tweet(quote, author, classSelector, twitterLinkElem, transitionElem) {
  const tweetLnk = document.querySelector(twitterLinkElem);
  const tweetBtn = document.querySelector(transitionElem);
  setTimeout( () => tweetBtn.classList.remove(classSelector), 1000 );
  tweetBtn.classList.add(classSelector);
  setTimeout( () => window.open( tweetLnk.href + '?&text=' + encodeURIComponent(
                    '"' + quote.trim() + '" ' + author)
                    ), 150 );
};

export { trigger, tweet };
