
function finnaMakeChar(){
// Rip everything from local storage
	let classProf = localStorage.getItem('classProf')
	let raceNum = localStorage.getItem('race')
	let morProf = localStorage.getItem('skillProficiencies')
	let stats = JSON.parse(localStorage.getItem('stats'))
	let desc = JSON.parse(localStorage.getItem('desc'))
	let inv = localStorage.getItem('inv').split(',')
	let play = {name: desc.name, gender: desc.gender, alignment:desc.alignment,background:"",height:desc.height,languages:desc.lang,weight:desc.weight,proficiencies:[],feats:[], class: [{level:1,class:localStorage.getItem('chosenClass')}], inventory:[], strength: Number(stats.str), dexterity:Number(stats.dex),wisdom:Number(stats.wis),intelligence:Number(stats.intel),constitution:Number(stats.cons),charisma:Number(stats.cha), race: ""}
	play.proficiencies.push(classProf)
	play.proficiencies.push(morProf)
	let race = loadDir("./races")[raceNum]
	for(var i = 0; i<race.languages.length;i++){
		play.languages.push(race.languages[i])
	}
	for (var i=0; i < race.feats.length;i++){
		play.feats.push(race.feats[i])
		
	}
	for (var i=0; i < race.armor_proficiencies.length;i++){
		play.proficiencies.push(race.armor_proficiencies[i])
		
	}
	for (var i=0; i < race.weapon_proficiencies.length;i++){
		play.proficiencies.push(race.weapon_proficiencies[i])
		
	}
	for (var i=0; i < race.ability_score_increase.length;i++){
		if ( race.ability_score_increase[i].stat === "charisma"){
			play.charisma += Number(race.ability_score_increase[i].mod)
		} else if ( race.ability_score_increase[i].stat === "wisdom"){
			play.wisdom += Number(race.ability_score_increase[i].mod)
		} else if ( race.ability_score_increase[i].stat === "dexterity"){
			play.dexterity += Number(race.ability_score_increase[i].mod)
		} else if ( race.ability_score_increase[i].stat === "strength"){
			play.strength += Number(race.ability_score_increase[i].mod)
		} else if ( race.ability_score_increase[i].stat === "intelligence"){
			play.intelligence += Number(race.ability_score_increase[i].mod)
		} else if ( race.ability_score_increase[i].stat === "constitution"){
			play.constitution += Number(race.ability_score_increase[i].mod)
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
		if ( !isNaN(i)){
		play.inventory.push(eList[i])
		}
	})

	//Do last
	//localStorage.clear();
	var fs = require('fs');
	fs.writeFileSync("./characters/" + play.name + ".json",JSON.stringify(play), {flag:"w+"})
	jump("index.html")
}
