function getFormData(formId) {
    return $(formId).serializeArray();
}

function error_reset() {
    $(".fa").css("display", 'none');
    $(".msg").css("display", "none");
    $(".input_box").css('border-color', '')
}
function error_set(index, error) {
    $(".fa").css("display", 'inline');
    $(".msg").css("display", "inline");
    $(".msg").css("color", "red");
    $('.msg')[index].innerText = error;
    $(".input_box").css("border-color", "red");
}

function success_reset() {
    $(".msg").css("display", "none");
    $(".input_box").css('border-color', '')
}
function success_set(index, success) {
    $(".msg").css("display", "inline");
    $(".msg").css("color", "green");
    $('.msg')[index].innerText = success;
    $(".input_box").css("border-color", "green");
}

function loader(hideref, showref) {
    // setTimeout(() => console.log("Hello"), 3000);
    hideref.hide();
    showref.show();
}

async function handleApiCall(currentPage, errorIndex, apiFunction, endPoint, data, axiosConfig) {
    currentPage[0].style.opacity = 0.5;
    queryProgress.start();
    const result = await apiFunction(endPoint, data, axiosConfig);
    if (!result.data) {
        currentPage[0].style.opacity = 1;
        // speak(result.response.data.description, result.response.data.description);
        error_set(errorIndex, result.response.data.description);
        queryProgress.end();
        return;
    }
    error_reset();
    queryProgress.end();
    return result;
}

speech = {
    synth: window.speechSynthesis,
}

function speak(sentance) {
    arr_voices = speech.synth.getVoices();
    speaker = new SpeechSynthesisUtterance(sentance);
    speaker.lang = 'hi-IN';
    speaker.voice = arr_voices[11];
    speech.synth.speak(speaker);
}


async function speak(englishSentance, hindiSentance) {
    arr_voices = speech.synth.getVoices();
    const language = await getValue("language");
    console.log(language);
    const sentance = language == "english" ? englishSentance : hindiSentance;
    if (language) {
        const utterance = new SpeechSynthesisUtterance(sentance);
        utterance.lang = 'hi-IN';
        utterance.voice = arr_voices[11];
        speech.synth.speak(utterance);
        return;
    }
    const utterance1 = new SpeechSynthesisUtterance(englishSentance);
    const utterance2 = new SpeechSynthesisUtterance(hindiSentance);
    utterance1.lang = utterance2.lang = 'hi-IN';
    utterance1.voice = utterance2.voice = arr_voices[11];
    speech.synth.speak(utterance1);
    speech.synth.speak(utterance2);

}