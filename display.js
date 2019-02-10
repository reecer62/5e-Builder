
function populateStats(person){
//Person should be a character file
	let str = document.getElementById("str")
	let strMod = (person.strength - 10) / 2
	let dex = document.getElementById("dex")
	let dexMod = (person.dexterity - 10) / 2
	let cons = document.getElementById("cons")
	let consMod = (person.constitution - 10) / 2
	let intel = document.getElementById("intel")
	let intelMod = (person.intelligence - 10) / 2
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
	intel.innerHTML = person.intelligence + "(" + (intelMod > 0? "+":"")+ intelMod + ")"
	wis.innerHTML = person.wisdom + "(" + (wisMod > 0? "+":"")+ wisMod + ")"
	cha.innerHTML = person.charisma + "(" + (chaMod > 0? "+":"")+ chaMod + ")"
	nameBox.innerHTML = person.name
	raceBox.innerHTML = person.race
	for (var i =0; i< person.class.length;i++){
		let tmp = document.createTextNode(person.class[i].class + ":"+ person.class[i].level +" ")
		classBox.appendChild(tmp)
	}
	
	let prof = document.getElementById("profbox")
	for(var i =0;i<person.proficiencies.length;i++){
		prof.appendChild(document.createTextNode(person.proficiencies[i] + ", "))
	}
	let langs = document.getElementById("langbox")
	for(var i =0;i<person.languages.length;i++){
		langs.appendChild(document.createTextNode(person.languages[i] + ", "))
	}
	let kiva = document.getElementById("feats")
	for(var i =0;i<person.feats.length;i++){
		let t = document.createElement("h2")
		t.innerHTML = person.feats[i].feat
		let box = document.createElement("div")
		box.appendChild(document.createTextNode(person.feats[i].description))
		kiva.appendChild(t)
		kiva.appendChild(box)
	}
	let stabbystick = document.getElementById("inventory")
	for (var i =0; i < person.inventory.length;i++){
		let row = stabbystick.insertRow(1)
		let iname = row.insertCell(0)
		let effect = row.insertCell(1)
		let price = row.insertCell(-1)
		iname.innerHTML = person.inventory[i].item_name + " "
		price.innerHTML = person.inventory[i].cost + " "
		effect.innerHTML = (typeof person.inventory[i].damage !== 'undefined'? person.inventory[i].damage[0].damage_dice + " " + person.inventory[i].damage[0].damage_type : person.inventory[i].ac.base) + " "
	}

}
