const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt select media stream, pass to video element, play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();

    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      //videoElement.play();
      videoElement.addEventListener('play', handlePlay);
    };
  } catch (error) {
    // catch error
    console.log('whoops, error here:', error);
  }
}

function handlePlay() {
  videoElement.requestPictureInPicture(); // Automatically enter PiP mode when the video starts playing
  videoElement.removeEventListener('play', handlePlay); // Remove the event listener once it's triggered
}

button.addEventListener('click', async () => {
  // disable button
  button.disabled = true;
  // start play
  await videoElement.play();
  await videoElement.requestPictureInPicture();
  // reset button
  button.disabled = false;
  // start pip
});

selectMediaStream();
