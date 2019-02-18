class Cat {
	constructor( terminal ) {
		this.terminal = terminal;
		this.maxLineLength = 250;
	}

	main( option = [] , exit ) {
		if ( option.length > 0 ) {
			let filePath = this.terminal.fileSystem.normalizePath(option[0]);
			let file = this.terminal.fileSystem.fileExist(filePath);
			if ( file ) {
				if ( file.readContent().length > 0 ) {
					let fileLineByLine = file.readContent().split('\n');
					fileLineByLine.map( line => {
						// if line is so big, tronc this 
						if ( line.length > this.maxLineLength ) {
							let totalSize = line.length;
							let lastPosition = 0;
							while ( totalSize > lastPosition ) {
								const partOfLine = line.slice(lastPosition, lastPosition + this.maxLineLength);
								this.terminal.stdOut(partOfLine);
								lastPosition += this.maxLineLength;
							}
						}
						else {
							this.terminal.stdOut(line);
						}
					});
				}
				else {
					this.terminal.stdOut('/!\\ Le fichier est vide /!\\');
				}
				
				exit();
			}
			else {
				this.terminal.error('Le fichier ' + option[0] + ' n\'existe pas !');
				exit();
			}
		}
		else {
			this.terminal.error('length commande cat a besoin d\'argument pour fonctionée');
			this.terminal.error('ex : cat file.txt');
			exit();
		}
	}
}