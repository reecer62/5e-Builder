
function populateStats(person){
//Person should be a character file
	let str = document.getElementById("str")
	let strMod = (person.strength - 10) / 2
	let dex = document.getElementById("dex")
	let dexMod = (person.dexterity - 10) / 2
	let cons = document.getElementById("cons")
	let consMod = (person.constitution - 10) / 2
	let intel = document.getElementById("intel")
	let intelMod = (person.intelliligence - 10) / 2
	let wis = document.getElementById("wis")
	let wisMod = (person.wisdom - 10) / 2
	let cha = document.getElementById("cha")
	let chaMod = (person.charisma - 10) / 2
	let nameBox = document.getElementById("pname")
	let raceBox = document.getElementById("race")
	let classBox = document.getElementById("class")

	str.innerHTML = person.strength + "(" + (strMod > 0? "+":"")+ strMod.toString() + ")"
	dex.innerHTML = person.dexterity + "(" + (dexMod > 0? "+":"")+ dexMod + ")"
	cons.innerHTML = person.constitution + "(" + (consMod > 0? "+":"")+ consMod + ")"
	intel.innerHTML = person.intelliligence + "(" + (intelMod > 0? "+":"")+ intelMod + ")"
	wis.innerHTML = person.wisdom + "(" + (wisMod > 0? "+":"")+ wisMod + ")"
	cha.innerHTML = person.charisma + "(" + (chaMod > 0? "+":"")+ chaMod + ")"
	nameBox.innerHTML = person.name
	raceBox.innerHTML = person.race
	for (var i =0; i< person.class.length;i++){
		let tmp = document.createTextNode(person.class[i].class + ":"+ person.class[i].level +" ")
		classBox.appendChild(tmp)
	}

}
