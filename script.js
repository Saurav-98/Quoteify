//  Getting the Ui Elements from HTML
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderEl = document.getElementById('loader');

let quoteList = [];

const showLoadingSpinner = () => {
  loaderEl.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loaderEl.hidden = true;
};

const selectRandomSingleQuote = () => {
  showLoadingSpinner();

  const singleQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

  //   Check if Author Field is blank and fill it with Unknown

  singleQuote.author
    ? (authorText.textContent = singleQuote.author)
    : (authorText.textContent = 'Unknown');

  // Check quote length to determine styling.

  singleQuote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');

  hideLoadingSpinner();
  quoteText.textContent = singleQuote.text;
};

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    quoteList = await response.json();
    selectRandomSingleQuote();
  } catch (error) {
    console.log('Something Went Wrong!', error);
  }
}

//  Tweet Quote

const renderTweetwithQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, '_blank');
};

// Adding Event Listeners
newQuoteBtn.addEventListener('click', selectRandomSingleQuote);
twitterBtn.addEventListener('click', renderTweetwithQuote);

// On Load

getQuotes();
