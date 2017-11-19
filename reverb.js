var Reverb = function(context, parameters, context2) {

	this.context = context;
	this.input = context.createGain();
	this.output = context.createGain();


	// create nodes
	this.wetGain = context.createGain();
	this.dryGain = context.createGain();
	this.reverb  = context.createConvolver();

	this.ir = new XMLHttpRequest();

	// IR 연결 부분
	// Impulse response created from a Slinky toy being plucked. 
	this.ir.open("Get","slinky_ir.wav",true);
	this.ir.responseType = "arraybuffer";
	this.ir.onload = function (){
		context.decodeAudioData(ir.response, function(buffer){
		this.reverb.buffer = buffer;
	});}

	// connect
	this.ir.send();


	this.input.connect(this.reverb);
	this.reverb.connect(this.wetGain);
	this.input.connect(this.dryGain);

	this.dryGain.connect(this.output);
	this.wetGain.connect(this.output);

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	this.parameters = parameters;

}


Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'reverb_time':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;
	}
}
Reverb.prototype.connect = function(node) {
	this.output.connect(node.input);
}
