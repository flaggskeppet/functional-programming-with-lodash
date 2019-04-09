/*
Recall the idea that it’s useful to return functions (closures) that are “configured” with
certain behaviors based on the context in which they were created. This same idea can
be extended to curried functions as well. That is, for every logical parameter, a curried
function will keep returning a gradually more configured function until all parameters
have been filled. Often called partial application
*/


console.log('/////// Ex 1.')
/* 
Function to curry 3 parameters, beginning from the right
*/
const curry3 = fun => last => middle => first => fun(first, middle, last);

var playlist = [
{artist: "Burial", track: "Archangel"},
{artist: "Ben Frost", track: "Stomp"},
{artist: "Ben Frost", track: "Stomp"},
{artist: "Emeralds", track: "Snores"},
{artist: "Burial", track: "Archangel"}];

const songToString = song => [song.artist, song.track].join(" - ");

// Create a curried version of the function with the predicate function already applied
let uniqueSongsPlayed = curry3(_.uniqBy)(false)(songToString);
console.log(uniqueSongsPlayed(playlist));

// Regular usage of uniqueBy: all paremeters are provided at every call
console.log(_.uniqBy(playlist, songToString, false));


console.log('/////// Ex 1.')

const toHex = n => {
  const hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join(''): hex;
}

const rgbToHexString = (r, g, b) => ["#", toHex(r), toHex(g), toHex(b)].join('');

// Regular usage of our rgbToHexString function
console.log(rgbToHexString(255, 255, 255)); // "#ffffff"

// A curried, partially applied function with the green and blue value set
let blueGreenish = curry3(rgbToHexString)(255)(200);
console.log(blueGreenish(0)); // "#00c8ff"


