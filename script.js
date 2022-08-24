let quoteList = [];

const randomQuote = () => {
  const singleQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  console.log(singleQuote);
};

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    quoteList = await response.json();
    randomQuote();
  } catch (error) {}
}

getQuotes();
