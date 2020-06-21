addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

var qqurl = QMSG;
var weurl = FTQQ;

async function parseParameters(request){
	
	const params = await new URL(request.url).searchParams.entries();
	const { headers } = request;
	let p = {};
	for(let x of params){
		p[x[0]] = decodeURIComponent(x[1]);
	}
	const contentType = headers.get('content-type');
	if(contentType && contentType.includes('form')){
		const formData = await request.formData();
		for (let x of formData.entries()) {
		  p[x[0]] = x[1];
		}
	}
	return p;
}

async function buildResponse(resp){
	var resp_headers = new Headers();
	resp_headers.set('access-control-allow-origin', '*');
	resp_headers.set('access-control-expose-headers', '*');
	resp_headers.set('Author', 'Akame');
	//maybe batter approach:https://community.cloudflare.com/t/object-size-content-length/117100
	//const buf = await response.clone().arrayBuffer();
	//buf.byteLength;
	return new Response(resp, { status: 200, headers: resp_headers });
}

async function handleRequest(request) {
	try {
		var p = await parseParameters(request);
		var t = p['type'];
		var resp = 'bad geteway.';
		if (t == 'qq') {
			const opt = {
				method: 'GET',
				redirect: 'follow',
			};
			var r = await fetch(qqurl + '?msg=' + p['msg'], opt);
			resp = await r.text();
		}else{
			const opt = {
				method: 'GET',
				redirect: 'follow',
				//body: JSON.stringify(p),
				headers:{
					'user-agent': 'curl/20.1',
					'content-type': 'application/json',
				}
			};
			
			var r = await fetch(weurl + '?text=' + encodeURIComponent(p['text']) + '&desp=' + encodeURIComponent(p['desp']), opt);
			resp = await r.text();
		}
		return await buildResponse(resp);

	} catch (e) {
		return new Response('ERROR->' + e, { status: 500 });
	}

}