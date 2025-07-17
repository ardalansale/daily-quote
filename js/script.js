const zen_api = "https://zenquotes.io/api/random";
const proxy_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(zen_api);

// Creates key based on today's date
function getTodayKey() {
    const today = new Date().toISOString().split("T")[0]; // t.ex. "2025-07-17"
    return `quote-${today}`;
}

// Show Quote
function displayQuote(quoteData) {
    const cleanQuote = quoteData.q.trim().replace(/\s+/g, ' ');
    const cleanAuthor = quoteData.a.trim();

    document.getElementById("quote").textContent = `"${cleanQuote}"`;
    document.getElementById("author").textContent = `${cleanAuthor}`;

    console.log(`"${cleanQuote}" — ${cleanAuthor}`);
}

// Main Function
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

    // Spara citatet för idag
    localStorage.setItem(todayKey, JSON.stringify(quoteData));
    displayQuote(quoteData);
    } catch (error) {
        console.error("Couldn't fetch quote:", error);
        document.getElementById("quote").textContent = "Couldn't fetch quote";
        document.getElementById("author").textContent = "";
    }
}

// Run when loading page
getquote();