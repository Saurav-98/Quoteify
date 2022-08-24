const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderEl = document.getElementById('loader');

let quoteList = [];

const loading = () => {
  loaderEl.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  quoteContainer.hidden = false;
  loaderEl.hidden = true;
};

const randomQuote = () => {
  loading();
  const singleQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

  //   Check if Author Field is blank and fill it with Unknown

  singleQuote.author
    ? (authorText.textContent = singleQuote.author)
    : (authorText.textContent = 'Unknown');

  // Check quote length to determine styling.

  singleQuote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');

  // set Quote Hide Loader
  complete();
  quoteText.textContent = singleQuote.text;
};

async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    quoteList = await response.json();
    randomQuote();
  } catch (error) {}
}

//  Tweet Quote

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
};

// Adding Event Listeners
newQuoteBtn.addEventListener('click', randomQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();
