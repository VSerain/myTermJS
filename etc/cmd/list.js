class List {
	constructor( terminal ) {
		this.terminal = terminal;
	}

	main( option = [] , exit ) {
		let folder = this.terminal.pwd;
		let onBase = false;

		if ( option.length == 1 && option[0][0] != '-' ) {
			folder = option[0];
		}
		else if ( option.length > 1 ) {
			folder = option[option.length - 1];
		}
		if ( folder[0] == '/' ) {
			onBase = true;
		}
		if ( !onBase && folder !=  this.terminal.pwd ) {
			folder = this.terminal.pwd + '/' +folder;
		}

		let content = this.searchInStorage(folder)
		if ( content ) {
			let list = ''
			content.map( posibilty => {
				if ( posibilty.type == 'FileFS' ) {
					list += '<span style="color:green">' + posibilty.name + ' </span>';
				}
				else if ( posibilty.type == 'DirectoryFS' ) {
					list += '<span style="color:blue">' + posibilty.name + ' </span>';
				}
				else {
					list += posibilty.name + ' ';
				}
			});
			this.terminal.stdOut(list);

		}
		else {
			this.terminal.error('Le dossier que vous chercher n\'a pas été trouver');
		}
		exit();
	}

	searchInStorage( position ) {
		const listContentInDir = [];
		position = position.replace('//', '/');
		const regexPosition = new RegExp('^' + position);
		Object.keys(this.terminal.fileSystem.storage).map( path => {
			if ( path.match(regexPosition) && path != position ) {
				const tmpPath = path.replace(position,'').replace(/^\//, '');
				if ( !tmpPath.match(/\//) ) {
					listContentInDir.push(this.terminal.fileSystem.storage[path]);					
				}
			}
		});
		return listContentInDir;
	}
}
