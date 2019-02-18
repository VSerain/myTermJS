class Edit {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		if ( option.length > 0 ) {
			let filePath = this.terminal.fileSystem.normalizePath(option[0]);
			let file = this.terminal.fileSystem.fileExist(filePath);
			if ( file ) {
				let content = file.readContent();
				this.terminal.clearTerminal();

				const textAreaElt = document.createElement('textarea');
				textAreaElt.id = 'edit';
				textAreaElt.autofocus = true;
				textAreaElt.value = content;

				const infoForUser = document.createElement('p');
				infoForUser.textContent = 'Ctrl-x pour sauvegardée et Ctrl-c pour fermer l\'edition';
				infoForUser.id = 'editorInfo';

				textAreaElt.addEventListener('keydown', (e) => {
					if (e.keyCode == 88 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
						e.preventDefault();
						this.terminal.fileSystem.writeInFile(file, textAreaElt.value);
					}
					else if (e.keyCode == 67 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
						e.preventDefault();
						textAreaElt.remove();
						infoForUser.remove();
						setTimeout(()=> {
							this.terminal.stdOut('Fermeture edition');
							exit();							
						});
					}
				});
				document.body.appendChild(textAreaElt);
				document.body.appendChild(infoForUser);
			}
			else {
				this.terminal.error('Le ficher' + filePath + ' n\'existe pas.');
				exit();
			}
		}
		else {
			this.terminal.error('Il faut presisée un nom de fichier');
			exit();
		}
	}

}