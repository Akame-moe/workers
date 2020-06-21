
var name = AUTHOR;
var body = `<html>

<head>
    <title>watch film and live online</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script src="https://cdn.bootcdn.net/ajax/libs/flv.js/1.5.0/flv.min.js"></script>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <h1 style="text-align: center;color: red;">请各位文明看直播 - Credit to Akame</h1>
    <div class="btn-group btn-group-justified" style="width: 100%;">
        <button class="btn btn-success" id="film_btn">看电影</button>
        <span class="caret"></span>
        <button class="btn btn-info" id="stream_btn">看直播</button>
    </div>
    <video id="videoElement" width="100%" height="100%"></video>
    <script>
setTimeout(function(){alert('streaming service unavailable,please refresh later or contact the developer[${name}] for help.')},2000);
        if (flvjs.isSupported()) {
            var h = '${HOST}'
            var flv_urls = {
                'film_btn': h + '/live/film.flv',
                'stream_btn': h + '/live/stream.flv'
            }
            var videoElement = document.getElementById('videoElement');
            var current;
            var flvPlayer;
            for(btn in flv_urls){
                document.getElementById(btn).onclick = e =>{
                    console.log('click btn:' + btn);
                    current = flv_urls[btn];
                    init_reset();
                }
            }
            function init_reset(){
                if (flvPlayer) {
                    if (flvPlayer.mediaInfo.url == current) return;
                    flvPlayer.destroy();
                    
                }
                flvPlayer = flvjs.createPlayer({
                    isLive: true,
                    type: 'flv',
                    url: current
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }


        }

    </script>
</body>

</html>`;


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	try {
   	
			var resp_headers = new Headers();
			resp_headers.set('access-control-allow-origin', '*');
			resp_headers.set('access-control-expose-headers', '*');
			resp_headers.set('Author', 'Akame <' + name +'>');
            resp_headers.set('content-type','text/html;charset=UTF-8');
			return new Response(body, { status: 200, headers: resp_headers });
		

	} catch (e) {
		return new Response('ERROR->' + e, { status: 500 });
	}

}