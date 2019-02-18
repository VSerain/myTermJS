class Clear {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		this.terminal.clearTerminal();
		exit();
		
	}
}