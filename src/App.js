import React from 'react';
import './App.css';
import { trigger, tweet } from './functions/functions';
import { FetchHooks, QuoteHooks, LoadHooks, BackgroundHooks } from './hooks/hooks';


// TODO:

// BUGS:

// DONE: ✅ make button disappear on click
//       ✅ define randomBetween min and max function
//       ✅ prettify author string
//       ✅ implement tweet functionality
//       ✅ define getNewValue function
//       ✅ add collision checks to QuoteBox
//       🆗 freeCC Feature Complete
//       ✅ replace while loop with do...while loop in getNewValue
//       ✅ improve quote symbol display logic
//       🆗 rewrite using hooks and unstated-next
//       ✅ separate code into individual files
//       ✅ move useEffect into QuoteHooks


function QuoteBoxDisplay() {
  const fetchhooks = FetchHooks.useContainer();
  const quotehooks = QuoteHooks.useContainer();
  const loadhooks = LoadHooks.useContainer();
  const backgroundhooks = BackgroundHooks.useContainer();

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

export default Display;
