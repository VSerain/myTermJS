class MkDir {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		if ( option.length > 0 ) {
			let dirPath = this.terminal.fileSystem.normalizePath(option[0]);
			if ( this.terminal.fileSystem.directoryExist(dirPath) ) {
				this.terminal.error('Le dossier ' + option[0] + ' existe déjà');
				exit();
			}
			else {
				let partOfPath = dirPath.split('/');
				const dirName = partOfPath[partOfPath.length - 1 ];
				let path = dirPath.replace('/' + dirName, '');
				let tmpPath = ''
				partOfPath.map( part => {
					if ( part.length > 0 ) {
						if ( ! this.terminal.fileSystem.directoryExist(tmpPath + '/' + part ) ) {
							this.terminal.fileSystem.createDir(tmpPath, part);
						}
						tmpPath += '/' + part;
					}
					
				});

				this.terminal.fileSystem.createDir( path, dirName);
				this.terminal.stdOut('Le dossier a bien été crée');
				exit();
			}
		}
		else {
			this.terminal.error('Il faut presisée un nom de dossier');
			exit();
		}
	}
}