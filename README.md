 # Speech2Text Converter

A React application that converts audio speech to text and passes it into a web service for processing.

## Features

* Convert audio speech to text using the Web Speech API.
* Translate the text into a different language using the Google Translate API.
* Generate a response to the text using the Google Generative AI API.
* Copy the response to the clipboard.

## Installation

```
git clone https://github.com/colddsam/speech2text-converter.git
cd speech2text-converter
npm install
```

## Usage

1. Start the development server:

```
npm start
```

2. Open http://localhost:3000 in your browser.

3. Click the microphone button to start listening.

4. Speak into the microphone.

5. The text of what you said will appear in the text box.

6. Click the translate button to translate the text into a different language.

7. The translation will appear in the text box.

8. Click the send button to generate a response to the text.

9. The response will appear in the text box.

10. Click the copy button to copy the response to the clipboard.

## How it works

The application uses the Web Speech API to convert audio speech to text. The text is then translated into a different language using the Google Translate API. The translation is then passed to the Google Generative AI API to generate a response. The response is then displayed in the text box and can be copied to the clipboard.

## Components

### App.jsx

The main component of the application. It renders the user interface and handles the state of the application.

* The `handleStartListening` function starts listening for audio input.
* The `handleStopListening` function stops listening for audio input.
* The `handleTranslateVoice` function translates the audio input into text.
* The `handleTranslateText` function translates the text into a different language.
* The `GenRes` function generates a response to the text.
* The `handleCopy` function copies the text to the clipboard.

### HoverButton.jsx

A component that renders a button that displays a tooltip when hovered over.

* The `setCurrentLanguage` function sets the current language of the application.

### GenRes.jsx

A component that generates a response to the text using the Google Generative AI API.

* The `GenRes` function generates the response.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](https://github.com/your-username/speech2text-converter/blob/main/CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License.