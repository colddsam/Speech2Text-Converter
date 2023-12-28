import React,{useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { speechConvert } from "../languages/language";
import copy from 'clipboard-copy';
import { sentBtn,sendBtn,recBtn,microphoneBtn } from "../assets/images";
import HoverButton from "./hoverButton";
import { handleTranslateText, handleTranslateVoice } from '../function/textSpeech';
import '../styles/searchBox.css'

const SearchBox = ({language,generatedText,editedTranscript,isSubmited,setEditedTranscript,setAudioSrc,setTextSrc,setSubmit,setCallModel,setCurrentLanguage}) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setEditedTranscript(transcript); 
    });

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="error">
                Browser does not support Speech Recognition
            </div>
        );
    }

    const handleStartListening = () => {
        setAudioSrc(null);
        setTextSrc('');
        SpeechRecognition.startListening({ continuous: true, language: speechConvert[language] });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleSubmit = async () => {
        setAudioSrc(null);
        try {
            setSubmit(false);
            await handleTranslateVoice(editedTranscript,language,setAudioSrc);
            await handleTranslateText(editedTranscript,setTextSrc);
            setCallModel(true);
            await copy(generatedText); 
            console.log('Text copied: ', generatedText);
            resetTranscript();
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="allInOne">
            <HoverButton setCurrentLanguage={ setCurrentLanguage} />
            <div className="line">
                <div className="container">
                    <input type="text" name="text" id="text" value={editedTranscript} onChange={(e) => (e.target.value)} />
                    <button className="inside" onClick={listening ? handleStopListening : handleStartListening}>
                        <img src={listening ? recBtn : microphoneBtn} alt="rec" />
                    </button>
                </div>
                <button className="outside" onClick={handleSubmit}>
                    <img src={isSubmited ? sentBtn : sendBtn} alt="send" />
                </button>
            </div>
        </div>
    )
}

export default SearchBox;