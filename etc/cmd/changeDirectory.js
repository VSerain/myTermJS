class ChangeDirectory {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		if ( option.length > 0 ) {
			let pathToDir = this.terminal.fileSystem.normalizePath(option[0]);

			if ( this.terminal.fileSystem.directoryExist(pathToDir) ) {
				if ( pathToDir != '/' ) {
					pathToDir + '/'
				}
				this.terminal.pwd = pathToDir;
			}
			else {
				this.terminal.error('Nous n\'avons pas trouver le dossier : ' + pathToDir);
			}
		}
		exit();
	}
}