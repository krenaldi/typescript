const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
// window.initMap = function() {
//   // JS API is loaded and available
// };

// Append the 'script' element to 'head'
document.head.appendChild(script);