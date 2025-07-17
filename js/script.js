const zen_api = "https://zenquotes.io/api/random";
const proxy_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(zen_api);

// Creates key based on today's date
function getTodayKey() {
    const today = new Date().toISOString().split("T")[0]; // t.ex. "2025-07-17"
    return `quote-${today}`;
}

// Show Quote
function capitalizeAfterNewlines(text) {
    return text.replace(/\n(.)/g, (match, char) => '\n' + char.toUpperCase());
}

function displayQuote(quoteData) {
    let cleanQuote = quoteData.q.trim().replace(/\s+/g, ' ');
    cleanQuote = capitalizeAfterNewlines(cleanQuote);
    cleanQuote = cleanQuote.replace(/\n/g, '<br>');

    const cleanAuthor = quoteData.a.trim();

    document.getElementById("quote").innerHTML = `"${cleanQuote}"`;
    document.getElementById("author").textContent = `${cleanAuthor}`;

    console.log(`"${quoteData.q}" — ${quoteData.a}`);
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