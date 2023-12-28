import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import copy from 'clipboard-copy';

import { recBtn, microphoneBtn, sendBtn, sentBtn } from "./assets/images";
import './styles/App.css';

import HoverButton from "./components/hoverButton";
import TextContainer from "./components/textContainer";

import { speechConvert } from './languages/language';


const App = () => {
    const [isSubmited, setSubmit] = useState(true);
    const [editedTranscript, setEditedTranscript] = useState('');
    const [language, setCurrentLanguage] = useState('english');
    const [audioSrc, setAudioSrc] = useState(null);
    const [textSrc, setTextSrc] = useState('');
    const [callModel, setCallModel] = useState(false);
    const [generatedText,setGeneratedText]=useState('');


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setEditedTranscript(transcript); 
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="error">
                Browser does not support Speech Recognition
            </div>
        );
    }

    const handleSubmit = async () => {
        setAudioSrc(null);
        try {
            setSubmit(false);
            await handleTranslateVoice();
            await handleTranslateText();
            setCallModel(true);
            await copy(generatedText); 
            console.log('Text copied: ', generatedText);
            resetTranscript();
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleStartListening = () => {
        setAudioSrc(null);
        setTextSrc('');
        SpeechRecognition.startListening({ continuous: true, language: speechConvert[language] });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleTranslateVoice = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/text/?txt=${editedTranscript}&lang=${language}`);
            const blob = await response.blob();
            setAudioSrc(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTranslateText = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/translate/?txt=${editedTranscript}`);
            const data = await response.json();
            setTextSrc(data.translate)
        }catch(error){
            console.error('Error fetching data: ', error);
        }
    };


    return (
        <div className="app">
            <div className="title">Speech2Text Converter</div>
            <div className="parag">This Project is for converting audio speech to text and passing it into our web service for processing.</div>
            <TextContainer setSubmit={setSubmit} textSrc={textSrc} setGeneratedText={setGeneratedText} generatedText={generatedText} setCallModel={ setCallModel} callModel={callModel} />
            <div className="allInOne">
                <HoverButton setCurrentLanguage={ setCurrentLanguage} />
                <div className="line">
                    <div className="container">
                        <input
                            type="text"
                            name="text"
                            id="text"
                            value={editedTranscript}
                            onChange={(e) => setEditedTranscript(e.target.value)} 
                        />
                        <button className="inside" onClick={listening?handleStopListening:handleStartListening}><img src={listening ? recBtn : microphoneBtn} alt="rec" /></button>
                    </div>
                    <button className="outside" onClick={handleSubmit}><img src={isSubmited?sentBtn:sendBtn} alt="send"/></button>
                </div>
            </div>

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
