// Get HTML elements
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Async function to select and display media stream
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.addEventListener('play', handlePlay);
    };
  } catch (error) {
    // Handle the error (if any)
  }
}

// Function to handle 'play' event
function handlePlay() {
  videoElement.requestPictureInPicture();
  videoElement.removeEventListener('play', handlePlay);
}

// Event listener for the button
button.addEventListener('click', async () => {
  button.disabled = true;
  await videoElement.play();
  button.disabled = false;
});

// Initial call to select media stream
selectMediaStream();
