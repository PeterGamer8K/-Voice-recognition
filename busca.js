(function () {


    var speakBtn = document.querySelector('#speakbt');
    var resultSpeaker = document.querySelector('#resultSpeak');
    const voice = speechSynthesis.getVoices().filter((voice) => voice.lang.includes("pt-BR"))[0]

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        let myDate = new Date();
        myDate = myDate.getHours() + ' e ' + myDate.getMinutes();

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var myRecognition = new SpeechRecognition();

        myRecognition.lang = 'pt-BR';


        speakBtn.addEventListener('click', function () {

            


            try {

                myRecognition.start();

                resultSpeaker.innerHTML = "Estou te ouvindo!";

            } catch (erro) {
                alert('erro:' + erro.message);
            }

        }, false);

        myRecognition.addEventListener('result', function (evt) {
        

            var resultSpeak = evt.results[0][0].transcript;

            

            


            switch (resultSpeak.toLowerCase()) {
                case 'clarear':
                    
                    utterance = new SpeechSynthesisUtterance("Clareando a tela");
                    utterance.voice = voice;
                    speechSynthesis.speak(utterance);
                    resultSpeaker.innerHTML = 'Clareando a tela...';
                    document.body.style.backgroundColor = '#33cc99';
                    break;
                case 'escurecer':
                    
                    utterance = new SpeechSynthesisUtterance("Escurecendo a tela");
                    utterance.voice = voice;
                    speechSynthesis.speak(utterance);
                    resultSpeaker.innerHTML = 'Escurecendo a tela...';
                    document.body.style.backgroundColor = '#047751';
                    break;
                case 'bom dia':
                    sayAndWriteTheReturnOfTheSpeech("Bom dia, seja bem vindo")
                    break;
                case 'que horas são':
                    sayAndWriteTheReturnOfTheSpeech("Agora são " + myDate)
                    break;
                
                case "qual o seu nome":
                    sayAndWriteTheReturnOfTheSpeech("Eu ainda não tenho nome")
                    break;
                case "olá":
                    sayAndWriteTheReturnOfTheSpeech("Olá, como vai você?")
                    break;
                case "bom dia":
                    sayAndWriteTheReturnOfTheSpeech("Bom dia")
                    break;
                case "oi":
                    sayAndWriteTheReturnOfTheSpeech("Olá")
                    break;
                default:
                    sayAndWriteTheReturnOfTheSpeech("Não entendi")

                

            }

            function sayAndWriteTheReturnOfTheSpeech (text) {
                utterance = new SpeechSynthesisUtterance(text);
                    utterance.voice = voice;
                    speechSynthesis.speak(utterance);
                    resultSpeaker.textContent = text;
            }


            if (resultSpeak.match(/buscar por/)) {

                resultSpeaker.innerHTML = 'Redirecionando...';
                utterance = new SpeechSynthesisUtterance("Redirecionando");
                utterance.voice = voice;
                speechSynthesis.speak(utterance);

                setTimeout(function () {

                    var resultado = resultSpeak.split('buscar por');
                    window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];

                }, 2000);
            }

            
        }, false);

        myRecognition.addEventListener('error', function (evt) {

            utterance = new SpeechSynthesisUtterance("Não entendi");
            utterance.voice = voice;
            speechSynthesis.speak(utterance);
            resultSpeaker.innerHTML = 'Não entendi';
            

        }, false);

    } else {
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

})();