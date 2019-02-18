class Terminal {
	constructor( terminalId ) {
		this.terminalElt = document.getElementById(terminalId);
		this.createHtmlElt();
		this.disableKey = [
			17,9
		]
		this.pwd = '/victor/';
		this.fileSystem = new FileSystem();
		this.history = [];
		this.alias = {};
		this.cursorPosition = 0;
		this.fileSystem.setCurrentTerminal(this);
		this.addAllAlias();
		this.listenKeyBoard()
		this.buildStartOfLine();
		// this.launchCmd( 'presentation' );
	}

	createHtmlElt() {
		this.terminalEltView = document.createElement('div');
		this.terminalElt.appendChild(this.terminalEltView);

		this.terminalEltInput = document.createElement('div');
		this.terminalElt.appendChild(this.terminalEltInput);

		this.terminalEltInputFirstPart = document.createElement('span');
		this.terminalEltInputSecPart = document.createElement('span');

		this.terminalEltInput.appendChild(this.terminalEltInputFirstPart);
		this.terminalEltInput.appendChild(this.terminalEltInputSecPart);
	}

	addAllAlias() {
		window.allCmd.map( commande => {
			this.alias[commande.cmd] = commande.class; 
		});
	}

	writeLine(text) {
		const ligneElt = document.createElement('p');
		ligneElt.innerHTML = text;
		this.terminalEltView.appendChild(ligneElt);
	}

	buildStartOfLine() {
		this.terminalElt.scrollTop = this.terminalElt.scrollHeight - this.terminalElt.clientHeight;
		if ( this.terminalEltInputFirstPart.innerHTML != this.pwd + ' ➜  $ ' ) {
			this.terminalEltInputFirstPart.innerHTML = this.pwd + ' ➜ $ ';			
		}
	}

	stdOut(text) {
		if ( !this.isInProgramme ) {
			text = this.buildStartOfLine() + '<span class="line">' + text + '</span>';
		}

		this.writeLine(text);
	}

	clearTerminal() {
		this.terminalEltView.innerHTML = '';
	}

	launchCmd( cmd, option = [] ) {
		if ( this.alias.hasOwnProperty(cmd) ) {
			this.isInProgramme = true;
			this.clearTerminalFistPart();
			const tpmProcess = {
				process : new this.alias[cmd](this)
			};
			try {
				tpmProcess.process.main(option , ( exitCode = 0) => {
					delete tpmProcess.process;
					this.isInProgramme = false;
					this.writeCmd('Enter')
				});
			} catch( e ) {
				console.log(e);
				this.error('Error in ' + cmd + ' :\n' + e);
				delete tpmProcess.process;
				this.isInProgramme = false;
				this.writeCmd('Enter')
			}
		}
		else {
			this.error('Commande ' + cmd + ' not found');
		}
	}

	listenKeyBoard() {
		window.addEventListener('keydown', (event) => {
			if ( this.disableKey.indexOf(event.keyCode) != -1 ) {
				event.preventDefault();
			} 

			if ( ! this.isInProgramme ) {
				this.writeCmd(event.key);
			}
		});
	}

	clearTerminalFistPart() {
		this.terminalEltInputFirstPart.innerHTML = '';
	}

	writeCmd( key ) {
		if ( ! this.isInProgramme ) {
			this.buildStartOfLine();
			if ( key == 'Enter' ) {
				if ( this.terminalEltInputSecPart.innerText.trim().length > 0 ) {
					this.writeLine(this.terminalEltInput.innerText);
					this.history.push(this.terminalEltInputSecPart.innerText);
					let cmdArray = this.terminalEltInputSecPart.innerText.split(' ');
					const cmd = cmdArray[0];
					if ( cmdArray.length > 1 ) {
						cmdArray.splice(0,1);
					}
					else {
						cmdArray = [];
					}
					this.terminalEltInputSecPart.innerHTML = '';
					this.launchCmd(cmd, cmdArray);
				}
			}
			else if ( key == 'Backspace' ) {
				this.terminalEltInputSecPart.innerHTML = this.terminalEltInputSecPart.innerHTML.substring(0, this.terminalEltInputSecPart.innerHTML.length - 1); ;
			}
			else if ( key == 'Tab' ) {
				console.log(this.history);
			}
			else if ( key == 'ArrowUp' ) {
				console.log(this.history);
			}
			else if ( key == 'ArrowDown' ) {
				console.log(this.history);
			}
			else {
				if ( key.length == 1 ) {
					this.terminalEltInputSecPart.innerHTML += key;				
				}
				else {
					console.log(key);
				}
			}
		}
	}


	error( text ) {
		this.writeLine('<span style="color:red">' + text + '</span>');
	}
}

