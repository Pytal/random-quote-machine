import React from 'react';
import './App.css';

const QUOTES = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const LOADS = ['Searching...', 'Generating...', 'Thinking...', 'Asking Alexa...', 'Reading 📖',
               'Going to the library...', '💤',
               '🔎📚', '🔎🌐', '🤔'];

// TODO: add collision checks to QuoteBox

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'The quick brown fox jumped over the lazy dog.',
      author: '-Bob',
      quotes: [],
      load: '',
      loads: LOADS,
      isquote: true
    };
    this.getQuote = this.getQuote.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    fetch(QUOTES)
      .then( a => a.json() )
      .then( b => this.setState({ quotes: b.quotes }) );
  }

  getQuote() {
    const min = 0;
    let max = this.state.quotes.length - 1;
    const newQuote = this.state.quotes[ Math.floor(Math.random() * (max - min + 1) + min) ];
    max = this.state.loads.length - 1;
    const newLoad = this.state.loads[ Math.floor(Math.random() * (max - min + 1) + min) ];
    this.setState({
      load: newLoad
    });
    setTimeout(() => {
      if (newLoad === '💤') {
        this.setState({
          quote: '',
          author: '',
          isquote: false
        })
      } else {
        this.setState({
          quote: newQuote.quote,
          author: '-' + newQuote.author,
          isquote: true
        })
      }
    }, 500);
    const card = document.querySelector('.card');
    const btn = document.querySelector('#new-quote');
    btn.classList.add('trigger');
    card.addEventListener('transitionend', () => btn.classList.remove('trigger'));
  }

  clicked() {
    this.props.changeBackground();
  }

  render() {
    return (
      <div className='grid'>
        <div id='quote-box'>
          <button onClick={() => { this.getQuote(); this.clicked(); }} id='new-quote'>New Quote</button>
          <div className='card'>
            <div className='card-front'>
              <p id='text'>{this.state.isquote ? <i className='fa fa-quote-left'></i> : ''} {this.state.quote}</p>
              <p id='author'>{this.state.author}</p>
            </div>
            <div className='card-back'>
              <p id='back-text'>{this.state.load}</p>
            </div>
          </div>
        </div>
        <button id='tweet-quote'><i className='fa fa-twitter'></i></button>
      </div>
    );
  }
};

class Backdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'whitesmoke',
      colors: ['#16A085', '#27AE60', '#2C3E50', '#F39C12', '#E74C3C',
               '#9B59B6', '#FB6964', '#342224', '#472E32', '#BDBB99',
               '#77B1A9', '#73A857']

    };
    this.changeBackground = this.changeBackground.bind(this);
  }

  changeBackground() {
    const min = 0;
    const max = this.state.colors.length - 1;
    let newBackground = this.state.colors[ Math.floor(Math.random() * (max - min + 1) + min) ];
    while (newBackground === this.state.background) {
      newBackground = this.state.colors[ Math.floor(Math.random() * (max - min + 1) + min) ];
    };
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
