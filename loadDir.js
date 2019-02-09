
function loadDir(path) {
var fs = require('fs');
var dir = fs.readdirSync(path, {withFileTypes:true} );
var ret = [];
for ( var i =0; i< dir.length;i++){
	if (dir[i].isFile()){
		let cur = fs.readFileSync(path + "/"+ dir[i].name)
		let parsed = JSON.parse(cur)
		ret.push(parsed)
	}
}
return ret;
}
