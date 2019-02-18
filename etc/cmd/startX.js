class StartX {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		const iframeElt = document.createElement('iframe');
		iframeElt.src="http://serain.be";
		iframeElt.style.displayNone = true;
		this.terminal.stdOut('Demarage en cours');
		iframeElt.addEventListener('load', (e)=> {
			iframeElt.style.displayNone = false;
		})
		document.body.appendChild(iframeElt);
	}

}