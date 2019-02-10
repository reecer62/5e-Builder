
// set of functions for adding and manipulating ability scores


// directly set the base value of a score. Only use this when entering base stats
function setBaseAbility(abilityName, value) {
	localStorage.setItem(abilityName, value)
}

// use this to modify ability scores without losing track of base stats. remember to subtract modifiers if they are removed
function modifyAbility(abilityName, modValue) {
	var curValue = localStorage.getItem(abilityName)
	localStorage.setItem(abilityName, (curValue + modValue))
}


