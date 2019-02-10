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
        var armorProfHeader = document.createElement("h4")
        armorProfHeader.textContent = "Armor Proficiencies"
        var armorProfObj = clas.armor_proficiencies
        var armorProficiencies = makeProfList(armorProfObj)
        infoSection.append(armorProfHeader)
        infoSection.append(armorProficiencies)

        // Weapons
        var weaponProfHeader = document.createElement("h4")
        weaponProfHeader.textContent = "Weapon Proficiencies"
        var weaponProfObj = clas.weapon_proficiencies
        var weaponProficiencies = makeProfList(weaponProfObj)
        infoSection.append(weaponProfHeader)
        infoSection.append(weaponProficiencies)
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