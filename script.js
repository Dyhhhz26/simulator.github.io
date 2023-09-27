document.getElementById('lens').addEventListener('change', function() {
    var lens = this.value;
    var imageUrl = 'images/' + lens + '.png';
    document.getElementById('image').src = imageUrl;
    // Apply image filters after changing the lens
    updateImageFilter();
  });
  
  document.getElementById('camera-mode').addEventListener('change', function() {
    const cameraMode = this.value;
    
    // Disable or enable ISO, Aperture, and Shutter Speed sliders based on Camera Mode
    const isoSlider = document.getElementById('iso');
    const apertureSlider = document.getElementById('aperture');
    const shutterSpeedSlider = document.getElementById('shutter-speed');
    
    if (cameraMode === 'A') {
        isoSlider.disabled = true;
        apertureSlider.disabled = true;
        shutterSpeedSlider.disabled = true;
    } else {
        isoSlider.disabled = false;
        apertureSlider.disabled = false;
        shutterSpeedSlider.disabled = false;
    }
    
    // Update the image filter based on the new Camera Mode
    updateImageFilter();
});


  // ISO
document.getElementById('iso').addEventListener('input', function() {
  const iso = parseInt(this.value);
  document.getElementById('iso-value').innerText = iso;
  updateImageFilter();
});

// Aperture (f/)
document.getElementById('aperture').addEventListener('input', function() {
  const aperture = parseFloat(this.value).toFixed(1);
  document.getElementById('aperture-value').innerText = `f/${aperture}`;
  updateImageFilter();
});

// Shutter Speed
document.getElementById('shutter-speed').addEventListener('input', function() {
  const shutterSpeed = this.value;
  document.getElementById('shutter-speed-value').innerText = shutterSpeed;
  updateImageFilter();
});

function updateImageFilter() {
  let cameraMode = document.getElementById('camera-mode').value;

  // Only update filter if camera mode is set to manual
  if (cameraMode === 'M') {
    let lens = document.getElementById('lens').value;
    let iso = parseInt(document.getElementById('iso').value);
    let aperture = parseFloat(document.getElementById('aperture').value).toFixed(1);
    let shutterSpeed = document.getElementById('shutter-speed').value;

    // Calculate overall brightness or apply any other relevant logic
    let brightness = (iso / 100) * Math.sqrt(parseFloat(aperture)) * (1 / eval(shutterSpeed));

    // Clamp brightness value between 0 and 2
    brightness = Math.min(2, Math.max(0, brightness));

    // Update image brightness
    let imageUrl = 'images/' + lens + '.png';
    document.getElementById('image').src = imageUrl;
    document.getElementById('image').style.filter = `brightness(${brightness})`;
  } else {
    // Reset image filter if camera mode is not manual
    document.getElementById('image').style.filter = '';
  }
}


/*  function updateImageFilter() {
    let cameraMode = document.getElementById('camera-mode').value;
  
    // Only update filter if camera mode is set to manual
    if (cameraMode === 'M') {
      let lens = document.getElementById('lens').value;
      let iso = isoValues[parseInt(document.getElementById('iso').value)];
      let aperture = apertureValues[parseInt(document.getElementById('aperture').value)];
      let shutterSpeed = shutterSpeedValues[parseInt(document.getElementById('shutter-speed').value)];
  
      // Calculate overall brightness or apply any other relevant logic
      let brightness = (iso / 100) * Math.sqrt(parseFloat(aperture)) * (1 / eval(shutterSpeed));
  
      // Clamp brightness value between 0 and 2
      brightness = Math.min(2, Math.max(0, brightness));
  
      // Update image brightness
      let imageUrl = 'images/' + lens + '.png';
      document.getElementById('image').src = imageUrl;
      document.getElementById('image').style.filter = `brightness(${brightness})`;
    } else {
      // Reset image filter if camera mode is not manual
      document.getElementById('image').style.filter = '';
    }
  }  */