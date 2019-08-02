import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { QUOTESURL, LOADS, COLOURS } from '../globals/globals';
import { getNewValue } from '../helpers/helpers';


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

const FetchHooks = createContainer(useFetchHooks);
const QuoteHooks = createContainer(useQuoteHooks);
const LoadHooks = createContainer(useLoadHooks);
const BackgroundHooks = createContainer(useBackgroundHooks);

export { FetchHooks, QuoteHooks, LoadHooks, BackgroundHooks };
