import React, { useState, useEffect, useRef } from 'react';
import { createContainer } from 'unstated-next';
import './App.css';

const QUOTESURL = `https://gist.githubusercontent.com/
                   camperbot/5a022b72e96c4c9585c32bf6a75f62d9/
                   raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/
                   quotes.json`;

const LOADS = ['Searching...', 'Generating...', 'Thinking...', 'Asking Alexa...', 'Reading 📖',
               'Going to the library...', '💤',
               '🔎📚', '🔎🌐', '🤔'];

const COLOURS = ['#16A085', '#27AE60', '#F39C12', '#E74C3C',
                 '#9B59B6', '#FB6964', '#BDBB99',
                 '#77B1A9', '#73A857'];

//       🆗 freeCC Feature Complete

// TODO:

// BUGS: 🔧 useEffect has a missing dependency: 'quotehooks'

// DONE: ✅ make button disappear on click
//       ✅ define randomBetween min and max function
//       ✅ prettify author string
//       ✅ implement tweet functionality
//       ✅ define getNewValue function
//       ✅ add collision checks to QuoteBox
//       ✅ replace while loop with do...while loop in getNewValue
//       ✅ improve quote symbol display logic
//       ✅ implement hooks and unstated-next

// Hooks
function useFetchHooks() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function setQuotesConstant() {
    const promise = await fetch( QUOTESURL.replace(/\s/g, '') );
    const json = await promise.json();
    setQuotes(json.quotes);
    setLoading(false);
  };

  useEffect(() => setQuotesConstant(), [] );

  return { quotes, loading };
};

function useQuoteHooks() {
  const [quote, setQuote] = useState(' The quick brown fox jumped over the lazy dog.');
  const [author, setAuthor] = useState('-Bob');
  const loadhooks = LoadHooks.useContainer();
  const fetchhooks = FetchHooks.useContainer();

  const getQuote = () => {
    const newQuote = getNewValue(quote, fetchhooks.quotes);
    setTimeout(() => {
      if (loadhooks.load === '💤') {
        setQuote('');
        setAuthor('');
      } else {
        setQuote(' ' + newQuote.quote);
        setAuthor('-' + newQuote.author.trim().replace( /[^a-z. ]/gi, '' ));
      };
    }, 500);
  };

  return { quote, author, getQuote };
};

function useLoadHooks() {
  const [load, setLoad] = useState('');
  const getLoad = () => setLoad( load => getNewValue(load, LOADS) );

  return { load, getLoad };
};

function useBackgroundHooks() {
  const [background, setBackground] = useState('whitesmoke');
  const getBackground = () => setBackground( getNewValue(background, COLOURS) );
  
  return { background, getBackground };
};

// Containers
const FetchHooks = createContainer(useFetchHooks);
const QuoteHooks = createContainer(useQuoteHooks);
const LoadHooks = createContainer(useLoadHooks);
const BackgroundHooks = createContainer(useBackgroundHooks);

// Functions
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

// Displays
function QuoteBoxDisplay() {
  const fetchhooks = FetchHooks.useContainer();
  const quotehooks = QuoteHooks.useContainer();
  const loadhooks = LoadHooks.useContainer();
  const backgroundhooks = BackgroundHooks.useContainer();

  // 🔧 useEffect has a missing dependency: 'quotehooks'
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) { firstLoad.current = false; return; };
    quotehooks.getQuote();
  }, [loadhooks.load] );

  return (
    <div className='grid'>
      {fetchhooks.loading ? <h1>Loading...</h1> :
      <div id='quote-box'>
        <button
          id='new-quote'
          onClick={() => {
            loadhooks.getLoad();
            trigger('trigger', '#new-quote', '.card');
            backgroundhooks.getBackground();
          }}>
          New Quote
        </button>
        <div className='card'>
          <div className='card-front'>
            <p id='text'>
              {quotehooks.quote !== '' ? <i className='fa fa-quote-left'></i> : ''}
              {quotehooks.quote}
            </p>
            <p id='author'>{quotehooks.author}</p>
          </div>
          <div className='card-back'>
            <p id='back-text'>{loadhooks.load}</p>
          </div>
        </div>
        <button
          id='tweet-quote-btn'
          onClick={() =>
            tweet(quotehooks.quote, quotehooks.author,
                  'trigger', '#tweet-quote', '#tweet-quote-btn')}>
          <i className='fa fa-twitter'></i>
          <a id='tweet-quote' href='https://twitter.com/intent/tweet'>
            Tweet Quote
          </a>
        </button>
      </div>
      }
    </div>
  )
};

function BackdropDisplay() {
  const backgroundhooks = BackgroundHooks.useContainer();

  return (
    <div className='backdrop' style={{ backgroundColor: backgroundhooks.background }}>
      <FetchHooks.Provider>
      <LoadHooks.Provider>
      <QuoteHooks.Provider>
        <QuoteBoxDisplay />
      </QuoteHooks.Provider>
      </LoadHooks.Provider>
      </FetchHooks.Provider>
    </div>
  )
};

function Display() {
  return (
    <BackgroundHooks.Provider>
      <BackdropDisplay />
    </BackgroundHooks.Provider>
  )
};

// Helper Functions
const randomBetween = (min, max) => ( Math.floor( Math.random() * (max - min + 1) + min ) );

const getNewValue = (prev, arr) => {
  const min = 0;
  const max = arr.length - 1;
  let curr;
  do { curr = arr[randomBetween(min, max)] } while (curr === prev);
  return curr;
};

export default Display;
