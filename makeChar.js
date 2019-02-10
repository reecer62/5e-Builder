
function finnaMakeChar(){
// Rip everything from local storage
	let classProf = localStorage.getItem('classProf')
	let raceNum = localStorage.getItem('race')
	let morProf = localStorage.getItem('skillProficiencies')
	let stats = JSON.parse(localStorage.getItem('stats'))
	let desc = JSON.parse(localStorage.getItem('desc'))
	let inv = localStorage.getItem('inv').split(',')
	let play = {name: desc.name, gender: desc.gender, alignment:desc.alignment,background:"",height:desc.height,languages:desc.lang,weight:desc.weight,proficiencies:[],feats:[], class: [{level:1,class:localStorage.getItem('chosenClass')}], inventory:[], strength: stats.str, dexterity:stats.dex,wisdom:stats.wis,intelligence:stats.intel,constitution:stats.cons,charisma:stats.cha, race: ""}
	play.proficiencies.push(classProf)
	play.proficiencies.push(morProf)
	let race = loadDir("./races")[raceNum]
	for(var i = 0; i<race.languages.length;i++){
		play.languages.push(race.languages[i])
	}
	for (var i=0; i < race.feats;i++){
		play.feats.push(race.feats[i])
		
	}
	for (var i=0; i < race.armor_proficiencies;i++){
		play.proficiencies.push(race.armor_proficiencies[i])
		
	}
	for (var i=0; i < race.weapon_proficiencies;i++){
		play.proficiencies.push(race.weapon_proficiencies[i])
		
	}
	for (var i=0; i < race.ability_score_increase;i++){
		if ( race.ability_score_increase[i].stat === "charisma"){
			play.charisma += race.ability_score_increase[i].mod
		} else if ( race.ability_score_increase[i].stat === "wisdom"){
			play.wisdom += race.ability_score_increase[i].mod
		} else if ( race.ability_score_increase[i].stat === "dexterity"){
			play.dexterity += race.ability_score_increase[i].mod
		} else if ( race.ability_score_increase[i].stat === "strength"){
			play.strength += race.ability_score_increase[i].mod
		} else if ( race.ability_score_increase[i].stat === "intelligence"){
			play.intelligence += race.ability_score_increase[i].mod
		} else if ( race.ability_score_increase[i].stat === "constitution"){
			play.constitution += race.ability_score_increase[i].mod
		}
		
	}
	
	let back = loadDir("./background")[desc.background]
	for (var i =0; i < back.proficiency.length;i++){
		play.proficiencies.push(back.proficiency[i])
	}
	for (var i =0; i < back.languages.length;i++){
		play.languages.push(back.languages[i])
	}
	play.feats.push(back.feature)
	
	let eList = loadDir("./items")
	inv.forEach(function (i) {
		play.inventory.push(eList[i])
	})

	//Do last
	//localStorage.clear();
	var fs = require('fs');
	fs.writeFileSync("./characters/" + play.name + ".json",JSON.stringify(play), {flag:"w+"})
	jump("index.html")
}
