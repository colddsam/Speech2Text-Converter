import React, { useState } from "react";

import './styles/App.css';

import SearchBox from "./components/searchBar";
import TextContainer from "./components/textContainer";

const App = () => {
    const [isSubmited, setSubmit] = useState(true);
    const [editedTranscript, setEditedTranscript] = useState('');
    const [language, setCurrentLanguage] = useState('english');
    const [audioSrc, setAudioSrc] = useState(null);
    const [textSrc, setTextSrc] = useState('');
    const [callModel, setCallModel] = useState(false);
    const [generatedText,setGeneratedText]=useState('');

    return (
        <div className="app">
            <div className="title">Speech2Text Converter</div>
            <div className="parag">This Project is for converting audio speech to text and passing it into our web service for processing.</div>
            <TextContainer setSubmit={setSubmit} textSrc={textSrc} setGeneratedText={setGeneratedText} generatedText={generatedText} setCallModel={ setCallModel} callModel={callModel} />
            <SearchBox language={language} generatedText={generatedText} editedTranscript={editedTranscript} isSubmited={isSubmited} setEditedTranscript={setEditedTranscript} setAudioSrc={setAudioSrc} setTextSrc={setTextSrc} setSubmit={setSubmit}  setCallModel={setCallModel} setCurrentLanguage={setCurrentLanguage}/>
            {audioSrc && (
                <div>
                    <audio controls>
                        <source src={audioSrc} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default App;
