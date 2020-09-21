var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var stopRecording = false;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Click anywhere to start speaking';

document.body.onclick = function() {
  if(stopRecording){
    stopRecording = false;
  }
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Response received: ' + color + '.';
  bg.style.backgroundColor = color;

  if(color.includes("stop") || color.includes("save")){
    stopRecording = true;
  }
  var a = document.forms["Form1"]["fname1"].value;
  var b = document.forms["Form2"]["fname2"].value;
  var c = document.forms["Form3"]["fname3"].value;
  var value = parseFloat(color);
  console.log(isNaN(value));
  if((a == null || a == "") && !isNaN(value)){
    if(value <= 3.0){
  document.getElementById('fname1').value = color;
  //startRecording();
}
else
diagnostic.textContent = 'Value should be less than 3.0.';
}
  else if((b == null || b == "") && !isNaN(value)){
    if(value >= 200.0){
  document.getElementById('fname2').value = color;}
  else
  diagnostic.textContent = 'Value should be greater than 200.0.';
    }
  else if((c == null || c == "") && !isNaN(value)){
    if(value >= 0.05){
  document.getElementById('fname3').value = color;}
  else
  diagnostic.textContent = 'Value should be greater than 0.05.';
    }
  console.log('Confidence: ' + event.results[0][0].confidence);
}


/*function startRecording(){
  console.log("inside startRecording");
  recognition.start();
}*/
recognition.onend = function() {
  console.log('Speech recognition service disconnected');
  if(!stopRecording){
  recognition.start();}
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
