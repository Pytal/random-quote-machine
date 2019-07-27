import React from 'react';
import './App.css';

const QUOTES = `https://gist.githubusercontent.com/
                camperbot/5a022b72e96c4c9585c32bf6a75f62d9/
                raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/
                quotes.json`;

const LOADS = ['Searching...', 'Generating...', 'Thinking...', 'Asking Alexa...', 'Reading 📖',
               'Going to the library...', '💤',
               '🔎📚', '🔎🌐', '🤔'];

//       🆗 freeCC Feature Complete

// DONE: ✅ make button disappear on click
//       ✅ define get random between min and max function
//       ✅ prettify author string
//       ✅ implement tweet functionality
//       ✅ define get new value function
//       ✅ add collision checks to QuoteBox

const randomBetween = (min, max) => ( Math.floor( Math.random() * (max - min + 1) + min ) );

const getNewValue = (prev, arr) => {
  const min = 0;
  const max = arr.length - 1;
  let curr = arr[randomBetween(min, max)];
  while (curr === prev) {
    curr = arr[randomBetween(min, max)];
  };
  return curr;
};

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: ' The quick brown fox jumped over the lazy dog.',
      author: '-Bob',
      quotes: [],
      load: '',
      loads: LOADS,
      isquote: true
    };
    this.getQuote = this.getQuote.bind(this);
    this.clicked = this.clicked.bind(this);
    this.tweeted = this.tweeted.bind(this);
  }

  componentDidMount() {
    fetch(QUOTES.replace(/\s/g, ''))
      .then( a => a.json() )
      .then( b => this.setState({ quotes: b.quotes }) );
  }

  getQuote() {
    const newQuote = getNewValue(this.state.quote, this.state.quotes);
    newQuote.quote = ' ' + newQuote.quote;
    newQuote.author = '-' + newQuote.author.trim().replace( /[^a-z. ]/gi, '' );
    const newLoad = getNewValue(this.state.load, this.state.loads);
    this.setState({
      load: newLoad
    });
    setTimeout( () => {
      if (newLoad === '💤') {
        this.setState({
          quote: '',
          author: '',
          isquote: false
        })
      } else {
        this.setState({
          quote: newQuote.quote,
          author: newQuote.author,
          isquote: true
        })
      }
    }, 500 );
  }

  clicked() {
    const card = document.querySelector('.card');
    const quoteBtn = document.querySelector('#new-quote');
    card.addEventListener('transitionend', () => quoteBtn.classList.remove('trigger'));
    quoteBtn.classList.add('trigger');
    this.props.changeBackground();
  }

  tweeted() {
    const tweetLnk = document.querySelector('#tweet-quote');
    const tweetBtn = document.querySelector('#tweet-quote-btn');
    setTimeout( () => tweetBtn.classList.remove('trigger'), 1000 );
    tweetBtn.classList.add('trigger');
    setTimeout( () => window.open( tweetLnk.href + '?&text=' + encodeURIComponent(
                      '"' + this.state.quote.trim() + '" ' + this.state.author) ),
                      150 );
  }

  render() {
    return (
      <div className='grid'>
        <div id='quote-box'>
          <button onClick={() => { this.getQuote(); this.clicked(); }} id='new-quote'>
            New Quote
          </button>
          <div className='card'>
            <div className='card-front'>
              <p id='text'>
                {this.state.isquote ? <i className='fa fa-quote-left'></i> : ''}
                {this.state.quote}
              </p>
              <p id='author'>{this.state.author}</p>
            </div>
            <div className='card-back'>
              <p id='back-text'>{this.state.load}</p>
            </div>
          </div>
        <button onClick={this.tweeted} id='tweet-quote-btn'>
          <i className='fa fa-twitter'></i>
          <a id='tweet-quote' href='https://twitter.com/intent/tweet'>Tweet Quote</a>
        </button>
        </div>
      </div>
    );
  }
};

class Backdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'whitesmoke',
      colours: ['#16A085', '#27AE60', '#F39C12', '#E74C3C',
               '#9B59B6', '#FB6964', '#BDBB99',
               '#77B1A9', '#73A857']
    };
    this.changeBackground = this.changeBackground.bind(this);
  }

  changeBackground() {
    const newBackground = getNewValue(this.state.background, this.state.colours);
    this.setState({
      background: newBackground
    });
  }

  render() {
    return (
      <div className='backdrop' style={{ backgroundColor: this.state.background }}>
        <QuoteBox changeBackground={this.changeBackground} />
      </div>
    );
  }
};

export default Backdrop;
