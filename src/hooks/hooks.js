import { useState, useEffect, useRef } from 'react';
import { createContainer } from 'unstated-next';
import { QUOTESURL, LOADS, COLOURS } from '../globals/globals';
import { getNewValue } from '../helpers/helpers';

const FetchHooks = createContainer(useFetchHooks);
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

const QuoteHooks = createContainer(useQuoteHooks);
function useQuoteHooks() {
  const [quote, setQuote] = useState(' The quick brown fox jumped over the lazy dog.');
  const [author, setAuthor] = useState('-Bob');
  const fetchhooks = FetchHooks.useContainer();
  const loadhooks = LoadHooks.useContainer();

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
    }, 500)
  };

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) { firstLoad.current = false; return; };
    getQuote();
  }, [loadhooks.load] ); // eslint-disable-line

  return { quote, author, getQuote };
};

const LoadHooks = createContainer(useLoadHooks);
function useLoadHooks() {
  const [load, setLoad] = useState('');
  const getLoad = () => setLoad( load => getNewValue(load, LOADS) );

  return { load, getLoad };
};

const BackgroundHooks = createContainer(useBackgroundHooks);
function useBackgroundHooks() {
  const [background, setBackground] = useState('whitesmoke');
  const getBackground = () => setBackground( background => getNewValue(background, COLOURS) );
  
  return { background, getBackground };
};

export { FetchHooks, QuoteHooks, LoadHooks, BackgroundHooks };
