// index page counter up//
let valueDisplays = document.querySelectAll(".num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let dtartValue = 0;
  let endValue = ParseInt(valueDisplay.getAttribute 
    ("data-val"));
    let duration = Math.floor(interval/ endValue);
    let counter = setInterval( function() {
    startValue += 1;
    valueDisplay.textcontent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
     }
    }, duration);
});
