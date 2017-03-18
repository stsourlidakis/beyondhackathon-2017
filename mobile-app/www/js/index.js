var app = {
	ocpToken: "b71f29d014184520bdd8cfa9dcf2bcbe",
	initialize: function() {
		$.support.cors = true;
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
	},
	receivedEvent: function(id) {
	},
	takePhoto() {
		navigator.camera.getPicture(this.onSuccess, this.onFail, {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL
			// sourceType: Camera.PictureSourceType.CAMERA,
			// correctOrientation: true
		});
	},
	onSuccess(imageData) {
		imageData = app.btoab(imageData);
		//console.log(typeof imageData);
		var params = {
			// Request parameters
			"returnFaceId": "true",
			"returnFaceLandmarks": "false",
			"returnFaceAttributes": ""
		};
		$.ajax({
			url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
			beforeSend: function(xhrObj){
				// Request headers
				xhrObj.setRequestHeader("Content-Type","application/octet-stream");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", app.ocpToken);
			},
		   	crossDomain: true,
			type: "POST",
			// Request body
			data: imageData,
			processData: false
		})
		.done(function(data) {
			app.identify(data[0].faceId);
		})
		.fail(function(data) {
			alert("error");
		});

	},
	onFail(message) {
		alert('Failed because: ' + message);
	},
	btoab(base64) {
		var binary_string = atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array( len );
		for (var i = 0; i < len; i++)        {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	},
	identify: function(faceId){
		var params = {
			"personGroupId":"vip",
			"faceIds":[faceId],
			"maxNumOfCandidatesReturned":1,
			"confidenceThreshold": 0.5
		};
		$.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/identify",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",app.ocpToken);
            },
		   crossDomain: true,
            type: "POST",
			data: JSON.stringify(params)
        })
        .done(function(data) {
			// Connect to the API
		})
        .fail(function() {
            alert("error");
        });
	}
};
