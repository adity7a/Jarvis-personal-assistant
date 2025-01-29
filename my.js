
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 2;
    text_speak.volume = 3;
    text_speak.pitch = 0;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Aditya Boss...");
        speak("How may I help you?")
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Aditya Sir...");
        speak("How may I help you?")
    } else {
        speak("Good Evening Aditya Sir...");
        speak("How may I help you?")
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Aditya Sir, How May I Help You?");
    } else if (message.includes('who am i?') || message.includes('who is your master?') ||  message.includes("who created you?")) {
        speak("You are Prince,my master, who created me.");      
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes('open whatsApp') ) {
        window.open('whatsApp:///');
        const finalText = "Opening wathsApp";
        speak(finalText);   
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open Tweeter")) {
        window.open("https://x.com/?lang=en", "_blank");
        speak("Opening Tweeter...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }  else if (message.includes('wordpad')) {
            window.open('WordPad:///');
            const finalText = 'Opening Word Pad';
            speak(finalText);    
    } else {
        window.open(`https://chatgpt.com/?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Chat gpt";
        speak(finalText);
    }
}