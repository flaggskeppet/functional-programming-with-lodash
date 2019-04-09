/*
Instead of using loops, use a functional approach:
 - Having the lyricgeneration in its own function and concatetanting the result from it to the song array
 - Chain will allow us to chain calls to an object
 - Reducing the array instead of looping it.
*/
const lyricSegment = n => 
    _.chain([])
    .push(n + " bottles of beer on the wall")
    .push(n + " bottles of beer")
    .push("Take one down, pass it around")
    .tap(lyrics => { // tapping into the pipeline with a custom function...
           if (n > 1)
             lyrics.push((n - 1) + " bottles of beer on the wall.");
           else
             lyrics.push("No more bottles of beer on the wall!");
         })
    .value();


const song = (start, end, lyricGen) =>
  _.reduce(_.range(start,end, -1),
           (acc,n) => acc.concat(lyricGen(n)), []);

console.log(song(29, 1, lyricSegment));
