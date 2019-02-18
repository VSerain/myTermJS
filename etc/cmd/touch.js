class Touch {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		if ( option.length > 0 ) {
			let filePath = this.terminal.fileSystem.normalizePath(option[0]);
			if ( this.terminal.fileSystem.fileExist(filePath) ) {
				this.terminal.error('Le fichier ' + option[0] + ' existe déjà');
				exit();
			}
			else {
				let partOfPath = filePath.split('/');
				const fileName = partOfPath[partOfPath.length - 1 ];
				let path = filePath.replace(new RegExp('/' + fileName + '$'), '');
				if ( this.terminal.fileSystem.directoryExist(path) ) {
					this.terminal.fileSystem.createFile( path, fileName);
					this.terminal.stdOut('Le ficher a bien été crée');
				}
				else {
					this.terminal.error('Le dossier ' + path + ' n\'existe pas');
				}
		
				exit();
			}
		}
		else {
			this.terminal.error('Il faut presisée un nom de fichier');
			exit();
		}
	}
}