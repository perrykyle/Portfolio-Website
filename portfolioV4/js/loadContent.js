// This is loadContent.js
function loadContent(pageName) {
    console.log(pageName);
    fetch(`./pages/${pageName}.html`)
        .then(response => response.text())
        .then(data => document.getElementById('main-content').innerHTML = data);
    return false;  // This prevents the default behavior of the link click
}
