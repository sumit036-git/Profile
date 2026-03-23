const setupElement = document.getElementById('setup');
const punchlineElement = document.getElementById('punchline');
const jokeBtn = document.getElementById('joke-btn');

const fetchJoke = async () => {
    // Show loading state
    setupElement.textContent = "Fetching a joke...";
    punchlineElement.textContent = "";
    jokeBtn.disabled = true;

    try {
        // Fetch data from the external API
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        const data = await response.json();
        
        // Display the setup
        setupElement.textContent = data.setup;
        
        // Add a slight delay for the punchline
        setTimeout(() => {
            punchlineElement.textContent = data.punchline;
            jokeBtn.disabled = false;
        }, 1500);

    } catch (error) {
        setupElement.textContent = "Oops! Couldn't fetch a joke.";
        punchlineElement.textContent = "Please check your internet connection and try again.";
        jokeBtn.disabled = false;
        console.error("Error fetching joke:", error);
    }
};

// Fetch a joke as soon as the page loads
fetchJoke();

// Fetch a new joke when the button is clicked
jokeBtn.addEventListener('click', fetchJoke);