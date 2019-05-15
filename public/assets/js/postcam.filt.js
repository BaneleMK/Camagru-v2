// few global variables
let width = 450,
    height = 0,
    filter = 'none';
    streaming = false;


    // these are DOM elements which i need to check out
    const picmethod = document.getElementById('picmethod');
    const picupload = document.getElementById('picupload');
    const webcam = document.getElementById('webcam');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const camshot = document.getElementById('camshot');
    const photos = document.getElementById('photos');
    const clear = document.getElementById('clear');
    const effect = document.getElementById('effect');
    const upload = document.getElementById('upload');
    const submit = document.getElementById('submit');
    const base64img = document.getElementById("base64imglink");

//should check promise vs callbacks.
// the following code is responsible for the webcam working normaly
navigator.mediaDevices.getUserMedia({video: true, audio: false})

    .then(
       function(stream){
           video.srcObject = stream;
           video.play();
       }
    ) .catch(
       function(error){
           console.log('Error occured at try ' + $(error));
       }
    );
    
    // the can play event occurs when video media has loaded enough to be able to play
    // i think i can skip these
    video.addEventListener('canplay', function(event){
        if (!streaming) {
            //video other element
            height = video.videoHeight / (video.videoWidth / width);

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height); 
            //set stream to true so that it never sets height
            streaming = true;
            console.log('canplay done');            
        }
    }, false);

    picupload.addEventListener('click', function(event){
        console.log('clicked on upload');
        
        document.getElementById("picmethod").innerHTML = "<input type=file name=file><button type=submit name=submit>Submit</button>";
        event.preventDefault();
    }, false);

    webcam.addEventListener('click', function(event){
        console.log('clicked on webcam');
        document.getElementById("picmethod").innerHTML = "<video id=video>There was an error in getting the camera feed.<br></video>";
        event.preventDefault();
    }, false);

    camshot.addEventListener('click', function(event){
        takepic();
        // this following DOM function prevents the default of an element 
        // from happening e.g link from following url or submit from submiting form
        event.preventDefault();
    }, false)

    //applying the effect
    effect.addEventListener('change', function(event) {
        filter = event.target.value;
        video.style.filter = filter;
        event.preventDefault();
    }, 'false')

    // this is for clearing images and everything
    clear.addEventListener('click', function(event) {
        console.log('hey i cleared');
        photos.innerHTML = '';
        filter = 'none';
        video.style.filter = filter;
        effect.selectedIndex = 0;
    }, false)

    function takepic() {
        console.log('taking pics');            
        // the canvas is made here.
        // const context = canvas.msGetInputContext('2d');
        const context = canvas.getContext('2d');
        console.log('getting context');            
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            
            console.log('set height again');            
            context.drawImage(video, 0, 0, width, height);

            const imgUrl = canvas.toDataURL('image/png');
            console.log(imgUrl);
            base64img.value = imgUrl;
            const img = document.createElement('img');

            img.setAttribute('src', imgUrl);
            
            img.style.filter = filter;
            img.src = "../uploads/1.png";
            // this is just adding the image to an array of imgaes
            photos.appendChild(img);
        }
    }