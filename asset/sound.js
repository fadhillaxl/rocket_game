

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    // Create an audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an audio source from the microphone stream
    const source = audioContext.createMediaStreamSource(stream);

    // Create a script processor node to analyze the audio data
    const scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    source.connect(scriptNode);
    scriptNode.connect(audioContext.destination);

    // Process the audio data
    scriptNode.onaudioprocess = function(audioProcessingEvent) {
      const inputBuffer = audioProcessingEvent.inputBuffer;
      const inputData = inputBuffer.getChannelData(0);

      let sum = 0;
      for (let i = 0; i < inputData.length; i++) {
        sum += inputData[i] * inputData[i];
      }

      // Calculate the average power in decibels
      const rms = Math.sqrt(sum / inputData.length);
      const db = 20 * Math.log10(rms);

      console.log('Current dB level:', db);
    //   document.getElementById("db").innerHTML = Math.round(db);
    //   db_meter(db)
    };
  })
  .catch(function(error) {
    console.error('Error accessing microphone:', error);
  });

  function db_meter(db){
    let db_box = document.getElementById("db_meter")
    
    if(db<-30){
        db_box.innerHTML = "RENDAH"
    }else if(db<-20){
        db_box.innerHTML = "Medium"
        
    }else if(db<-10){
        db_box.innerHTML = "Keras"
        
    }
  }
