function parseClasses (classes) {
    var classList = document.getElementById("classList")

    // Add class names as options in the dropdown menu
    for (let i = 0; i < classes.length; i++) {
        var option = document.createElement("option")
        option.text = classes[i].class_name
        option.value = i
        // Add the classes in order
        classList.add(option, classList[i])     
    }

    // Display information of selected class in menu
    classList.addEventListener("change", function() {
        var infoSection = document.getElementById("class-info")

        // Clear out every child element except first
        for (let i = infoSection.children.length-1; i > 0; i--) {
            // console.log(infoSection.children[i])
            infoSection.removeChild(infoSection.children[i])
        }

        // Get class from class list given a class index
        var classIdx = classList.value
        var clas = classes[classIdx]

        /* Create markup for class */

        // Class Name
        var className = document.createElement("h3")
        className.textContent = clas.class_name
        infoSection.append(className)

        // Hit die
        var hitDie = document.createElement("p")
        hitDie.textContent = "Hit Die: " + clas.hit_die
        infoSection.append(hitDie)

        // Armor
        if (clas.armor_proficiencies.length > 0) {
            var armorProfHeader = document.createElement("h4")
            armorProfHeader.textContent = "Armor Proficiencies"
            var armorProfObj = clas.armor_proficiencies
            var armorProficiencies = makeProfList(armorProfObj)
            infoSection.append(armorProfHeader)
            infoSection.append(armorProficiencies)
        }
        

        // Weapons
        if (clas.weapon_proficiencies.length > 0) {
            var weaponProfHeader = document.createElement("h4")
            weaponProfHeader.textContent = "Weapon Proficiencies"
            var weaponProfObj = clas.weapon_proficiencies
            var weaponProficiencies = makeProfList(weaponProfObj)
            infoSection.append(weaponProfHeader)
            infoSection.append(weaponProficiencies)            
        }

        // Tools
        if (clas.tool_proficiencies.length > 0) {
            var toolProfHeader = document.createElement("h4")
            toolProfHeader.textContent = "Tool Proficiencies"
            var toolProfObj = clas.tool_proficiencies
            var toolProficiencies = makeProfAry(toolProfObj)
            infoSection.append(toolProfHeader)
            infoSection.append(toolProficiencies)               
        }

        // Saving Throws
        if (clas.saving_throws.length > 0) {
            var savThrowProfHeader = document.createElement("h4")
            savThrowProfHeader.textContent = "Saving Throws"
            var savThrowProfObj = clas.saving_throws
            var savThrowProficiencies = makeProfAry(savThrowProfObj)
            infoSection.append(savThrowProfHeader)
            infoSection.append(savThrowProficiencies)               
        }

        // Skill Options
        if (clas.number_of_skills > 0) {
            var numSkillsSelected = 0

            // Add headers
            var skillsProfHeader = document.createElement("h4")
            skillsProfHeader.textContent = "Skills"
            infoSection.append(skillsProfHeader)
            var skillProfDesc = document.createElement("p")
            skillProfDesc.textContent = "Select " + clas.number_of_skills + " to be proficient in."
            infoSection.append(skillProfDesc)

            // Add checkboxes for each skill
            for (let i = 0; i < clas.skill_options.length; i++) {
                var skillBox = document.createElement("input")
                skillBox.type = "checkbox"
                skillBox.name = clas.skill_options[i]
                skillBox.value = clas.skill_options[i]
                skillBox.id = clas.skill_options[i]

                var skillLabel = document.createElement("label")
                skillLabel.htmlFor = clas.skill_options[i]
                skillLabel.appendChild(document.createTextNode(clas.skill_options[i]))

                skillBox.addEventListener("change", function () {
                    if (this.checked && (numSkillsSelected < clas.number_of_skills)) {
                        numSkillsSelected++
                        skillProfDesc.innerHTML = "Select " + (clas.number_of_skills - numSkillsSelected) + " to be proficient in."
                    } else if (!this.checked && (numSkillsSelected > 0)) {
                        numSkillsSelected--
                        skillProfDesc.innerHTML = "Select " + (clas.number_of_skills - numSkillsSelected) + " to be proficient in."
                    }
                    if (numSkillsSelected == clas.number_of_skills) {
                        var checkboxes = document.querySelectorAll('input[type=checkbox]')
                        for (let i = 0; i < checkboxes.length; i++) {
                            if (checkboxes[i].checked != true) {
                                checkboxes[i].setAttribute("disabled", "disabled") 
                            }
                        }
                    } else {
                        var checkboxes = document.querySelectorAll('input[type=checkbox]')
                        for (let i = 0; i < checkboxes.length; i++) {
                            if (checkboxes[i].checked == false) {
                                checkboxes[i].removeAttribute("disabled") 
                            }
                        }
                    }
                })

                infoSection.append(skillBox)
                infoSection.append(skillLabel)
            }
        }

        // Features
        var featuresHeader = document.createElement("h3")
        featuresHeader.textContent = "Class Features"
        infoSection.append(featuresHeader)
        var featureList = document.createElement("ul")
        var featuresObj = clas.class_features
        for (let i = 0; i < featuresObj.length; i++) {
            var hasOptions = featuresObj[i].options || 0
            if (hasOptions != 0) {
                var featureSection = makeFeatureSection(featuresObj[i])
                // Feature Options
                var optionsHeader = document.createElement("h4")
                optionsHeader.textContent = "Options"
                featureSection.appendChild(optionsHeader)
                var optionsList = document.createElement("ul")
                var options = featuresObj[i].options
                for (let i = 0; i < options.length; i++) {
                    var featItem = document.createElement("li")
                    // Feat header
                    var featHeader = document.createElement("h4")
                    featHeader.textContent = "Feature: " + options[i].feat
                    featItem.appendChild(featHeader)
                    // Feat description
                    var featDesc = document.createElement("p")
                    featDesc.textContent = options[i].description
                    featItem.appendChild(featDesc)
                    
                    optionsList.appendChild(featItem)
                }
                // Append feature info to feature list
                featureSection.append(optionsList)
                featureList.appendChild(featureSection)
            } else {
                var featureSection = makeFeatureSection(featuresObj[i])
                // Append feature info to feature list
                featureList.appendChild(featureSection)
            }
        }
        infoSection.append(featureList)

    })
}

function makeProfList(profObj) {
    var objProficiencies = document.createElement("ul")
    for (let i = 0; i < profObj.length; i++){
        var obj = profObj[i]
        var keyName = Object.keys(obj)[0]
        var isProf = obj[keyName]
        if (isProf === "True") {
            var profItem = document.createElement("li")
            profItem.appendChild(document.createTextNode(keyName))
            objProficiencies.appendChild(profItem)
        }
    }
    return objProficiencies
}

function makeProfAry(profObj) {
    var objProficiencies = document.createElement("ul")
    for (let i = 0; i < profObj.length; i++) {
        var profItem = document.createElement("li") 
        profItem.appendChild(document.createTextNode(profObj[i]))
        objProficiencies.appendChild(profItem)
    }
    return objProficiencies
}

function makeFeatureSection(featureObj) {
    var featureSection = document.createElement("li")
    // Feature name
    var featHeader = document.createElement("h4")
    featHeader.textContent = "Feature: " + featureObj.feature
    featureSection.appendChild(featHeader)
    // Feature description
    var featDesc = document.createElement("p")
    featDesc.textContent = featureObj.description
    featureSection.appendChild(featDesc)
    // Feature level
    var featLevel = document.createElement("p")
    featLevel.textContent = "Level: " + featureObj.level
    featureSection.appendChild(featLevel)
    // Feature subclass
    var featSubclass = document.createElement("p")
    featSubclass.textContent = "Subclass: " + featureObj.subclass
    featureSection.append(featSubclass)
    
    return featureSection
}