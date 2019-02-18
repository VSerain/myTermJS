class Presentation {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		const allLines = [
			'Bonjour,',
			'Je suis Victor Serain, bienvenue sur mon protfolio,',
			'celui-ci n\'a pas d\'interface graphique ...',
			'Juste une inteface de commande :) !',
			'Vous pouver tapée help a tous momment pour avoir de l\'aide.',
			'Les commandes qui sont implementée se rapproche d\'un terminal UNIX!',
		];
		let position = 0;
		var interval = setInterval( () => {
			this.terminal.stdOut(allLines[position]);
			position++
			if ( position > allLines.length -1 ) {
				clearInterval(interval);
				exit()
			}
		},200);
	}
}