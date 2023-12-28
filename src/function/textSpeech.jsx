    const handleTranslateVoice = async (editedTranscript,language,setAudioSrc) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/text/?txt=${editedTranscript}&lang=${language}`);
            const blob = await response.blob();
            setAudioSrc(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTranslateText = async (editedTranscript,setTextSrc) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY_LINK}/translate/?txt=${editedTranscript}`);
            const data = await response.json();
            setTextSrc(data.translate)
        }catch(error){
            console.error('Error fetching data: ', error);
        }
    };

    export {handleTranslateText, handleTranslateVoice};