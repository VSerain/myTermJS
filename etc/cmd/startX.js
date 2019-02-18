class StartX {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		const iframeElt = document.createElement('iframe');
		iframeElt.src="www.ggogle.fr";
		iframeElt.style.displayNone = true;
		this.terminal.stdOut('Demarage en cours');
		iframeElt.addEventListener('load', (e)=> {
			iframeElt.style.displayNone = false;
		})
		document.body.appendChild(iframeElt);
	}

}