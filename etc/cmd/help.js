class Help {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		this.terminal.stdOut('[ ls ] Premet de lister le contenue d\'un dossier');
		this.terminal.stdOut('[ cd ]  Premet d\'acceder a un dossier');
		this.terminal.stdOut('[ touch ] permet de crée un fichier');
		this.terminal.stdOut('[ cat ] permet d\'affichier le contenu d\'un fichier');
		this.terminal.stdOut('[ mkdir ] permet de crée un dossier');
		this.terminal.stdOut('[ pwd ] affiche votre position');
		this.terminal.stdOut('[ clear ] vide le terminal');
		this.terminal.stdOut('[ edit ] permet d\'editer le contenue d\'un fichier');
		this.terminal.stdOut('[ startx ] permet de lancée l\'interface graphique');
		this.terminal.stdOut('[ exit ] permet de quiter l\'interface');
		this.terminal.stdOut('D\'autre commande sont en cours de développement ;)');
		exit();
		
	}
}