function parseChars(characters) {
    var charList = document.getElementById("charList")
    // For every chararacter, create a list element and append it to the character list
    for (let i = 0; i < characters.length; i++) {
        var charString = ""
        var character = characters[i]
        var charName = character.name
        charString += "Name: " + charName + " Classes: "
        var charClasses = character.class
        for (let i = 0; i < charClasses.length; i++) {
            var charClass = charClasses[i]
            if (i === (charClasses.length-1)) {
                charString += charClass.class + " " + charClass.level
            } else {
                charString += charClass.class + " " + charClass.level + " / "
            }
        }
        var charRace = character.race
        charString += " Race: " + charRace
        console.log(charString)
        // Append to list element character attributes and render to character list
        var listNode = document.createElement("li")
        var linkNode = document.createElement("a")
        linkNode.href = "#"
        linkNode.innerHTML = charString
        listNode.append(linkNode)
        charList.append(listNode)
    }
}