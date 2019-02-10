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
        // Create markup for class
        var className = document.createElement("h2")
        className.textContent = clas.class_name
        // Append class to the info section
        infoSection.append(className)
    })
}