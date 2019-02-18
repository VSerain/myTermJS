class FileSystem {
	constructor() {
		this.storage = this.generateDefaultStorage();
	}

	setCurrentTerminal( terminal ) {
		this.terminal = terminal;
	}

	saveStorage() {
		localStorage.setItem('storage', JSON.stringify(this.storage));
	}

	getStorage() {
		let storage = localStorage.getItem('storage');
		if ( storage ) {
			storage = JSON.parse(storage);
		}
		return storage;
	}

	writeInFile( file, content ) {
		file.writeContent(content);
		this.saveStorage();
	}

	createFile( filePath , fileName , right = 666 ) {
		this.storage[filePath + '/' + fileName ] = new FileFS(fileName, right);
		this.saveStorage();
	}

	createDir( dirPath , dirName , right = 666 ) {
		this.storage[dirPath + '/' + dirName ] = new DirectoryFS(dirName, right);
		this.saveStorage();
	}

	generateDefaultStorage() {
		let globalDirectory = {
			'/' : new DirectoryFS('/', 666),
			'/victor' : new DirectoryFS('victor', 666),
			'/victor/test.txt' : new FileFS('test.txt',666, 'Je suis un test'),
			'/victor/dossier' : new DirectoryFS('dossier', 666),
			'/victor/dossier/file.txt' : new FileFS('file.txt', 666),
			'/etc' : new DirectoryFS('etc', 666),
		}

		const storageSave = this.getStorage();
		if ( storageSave ) {
			globalDirectory = {};
			Object.keys(storageSave).map( path => {
				const tmpObject = storageSave[path];
				if ( tmpObject.type == "FileFS" ) {
					globalDirectory[path] = new FileFS(tmpObject.name, tmpObject.right, tmpObject.content);
				}
				else if ( tmpObject.type == "DirectoryFS" ) {
					globalDirectory[path] = new DirectoryFS(tmpObject.name, tmpObject.right);
				}
			})
		}

		return globalDirectory;
	}

	directoryExist ( link ) {
		if ( link[link.length - 1] == '/' ) {
			link = link.split(link.length - 1,1);
		}
		if ( this.storage.hasOwnProperty(link) && this.storage[link].type == 'DirectoryFS' ) {
			return this.storage[link];			
		}
		return false;
	}

	fileExist ( link ) {
		if ( link[link.length - 1] == '/' ) {
			link = link.split(link.length - 1,1);
		}
		if ( this.storage.hasOwnProperty(link) && this.storage[link].type == 'FileFS' ) {
			return this.storage[link];			
		}
		return false;
	}

	normalizePath( link ) {
		let onBase = false;
		if ( link[0] == '/' ) {
			onBase = true;
		}
		if ( !onBase ) {
			link = this.terminal.pwd + '/' +link;
		}

		// Calc position if .. or . 
		let linkSplit = link.split('/').reverse();
		let newlink = [];
		let notSave = 0;
		linkSplit.map(directory => {
			if ( directory != '' ) {
				if ( directory == '..' ) {
					notSave++;
				}
				else if ( directory != '.' && notSave == 0 ) {
					newlink.push(directory);
				}
				else if ( notSave > 0) {
					notSave--;
				}
			}
		});
		link = '/' + newlink.reverse().join('/');
		if ( link.length == 0 ) {
			link = '/';
		}
		return link
	}



}