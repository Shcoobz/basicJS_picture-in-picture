const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.addEventListener('play', handlePlay);
    };
  } catch (error) {}
}

function handlePlay() {
  videoElement.requestPictureInPicture();
  videoElement.removeEventListener('play', handlePlay);
}

button.addEventListener('click', async () => {
  button.disabled = true;
  await videoElement.play();
  //await videoElement.requestPictureInPicture();
  button.disabled = false;
});

selectMediaStream();
