var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);

function asyncGetAny(interval, urls, onsuccess, onfailure) {
    var n = urls.length;
    var looper = function(i) {
        setTimeout(function() {
            if (i >= n) {
                onfailure("failed");
                return;
            }
            $.get(urls[i], onsuccess)
                .always(function() {
                    console.log("try: " + urls[i])
                })
                .fail(function() {
                    looper(i + 1);
                });
        }, interval);
    }
    looper(0);
    return "go";
}

/*
You’ll notice that when the call to jQuery’s asynchronous $.get function fails, a recursive
call to looper is made. This call is no different (in principle) than any other mutually
recursive call, except that each invocation occurs on a different event-loop tick and starts
with a clean stack.
*/

var urls = ['https://dsfgfgs.com', 'https://sghjgsj.biz', '_.html', 'foo.txt'];
asyncGetAny(2000,urls, 
            function(data) { alert("Got some data") },
            function(data) { console.log("all failed") });
