window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = window.scrollY;
    const gifElement = document.querySelector('.gif-container img');
    const gifHeight = gifElement.offsetHeight;
    const sidebar = document.getElementById('sidebar-container');
    const mainContent = document.querySelector('.main-content');

    // sidebar and main-content fade in
    if (scrollHeight > windowHeight * 0.7) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('show');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
    }

    // gif fade out
    if (scrollHeight > gifHeight * 0.15) {
        let opacity = 1 - (scrollHeight - gifHeight * 0.15) / (gifHeight * 0.65);
        opacity = opacity < 0 ? 0 : opacity;
        gifElement.style.opacity = opacity.toString();
    }
});

