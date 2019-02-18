class PrintWorkingDirectory {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		this.terminal.stdOut(this.terminal.pwd);
		exit();
	}
}