const zen_api = "https://zenquotes.io/api/random";
const proxy_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(zen_api);

// Create a key based on today's date
function getTodayKey() {
    const today = new Date().toISOString().split("T")[0];
    return `quote-${today}`;
}

// Display the quote and author in the HTML
function displayQuote(quoteData) {
  let cleanQuote = quoteData.q.trim();
    cleanQuote = cleanQuote.replace(/\n/g, '<br>');

    const cleanAuthor = quoteData.a.trim();

    document.getElementById("quote").innerHTML = `"${cleanQuote}"`;
    document.getElementById("author").textContent = `${cleanAuthor}`;

    console.log(`"${quoteData.q}" — ${quoteData.a}`);
}

// Main function: fetch quote or use saved one
async function getquote() {
    const todayKey = getTodayKey();
    const savedQuote = localStorage.getItem(todayKey);

    if (savedQuote) {
        const quoteData = JSON.parse(savedQuote);
        displayQuote(quoteData);
        return;
    }

    try {
    const response = await fetch(proxy_url);
    const data = await response.json();
    const quoteData = JSON.parse(data.contents)[0];

    // Save today's quote
    localStorage.setItem(todayKey, JSON.stringify(quoteData));
    displayQuote(quoteData);
    } catch (error) {
    console.error("Couldn't fetch quote:", error);
    document.getElementById("quote").textContent = "Couldn't fetch quote";
    document.getElementById("author").textContent = "";
    }
}

// Run on page load
getquote();