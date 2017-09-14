function radiusSlider() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = (slider.value / 1000);
  slider.oninput = function() {
    slideVal = this.value;
    output.innerHTML = (this.value / 1000) ;
  }
}
