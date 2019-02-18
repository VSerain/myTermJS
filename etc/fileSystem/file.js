class FileFS {
	constructor( name , right = 666, content = '' ) {
		this.name = name;
		this.right = right;
		this.content = content;
		this.type = 'FileFS';
	}

	readContent() {
		return this.content;
	}

	writeContent( content, option = null ) {
		this.content = content;
	}
}