let darkMode = false;

document.getElementById('theme-switcher').addEventListener('click', function() {
    if (!darkMode) {
        // Switch to dark mode
        document.documentElement.classList.add('dark-mode');
        // Update button text
        document.getElementById('theme-switcher').innerText = 'Switch to Light Mode';

        document.getElementById('linkedin').setAttribute('src', './images/dark/dark_linkedin.png');
        document.getElementById('github').setAttribute('src', './images/dark/dark_github.png');
        document.getElementById('twitter').setAttribute('src', './images/dark/dark_twitter.png');
        document.getElementById('email').setAttribute('src', './images/dark/dark_email.png');

        darkMode = true;
    } else {
        // Switch to light mode
        document.documentElement.classList.remove('dark-mode');
        // Update button text
        document.getElementById('theme-switcher').innerText = 'Switch to Dark Mode';

        document.getElementById('linkedin').setAttribute('src', './images/light/light_linkedin.png');
        document.getElementById('github').setAttribute('src', './images/light/light_github.png');
        document.getElementById('twitter').setAttribute('src', './images/light/light_twitter.png');
        document.getElementById('email').setAttribute('src', './images/light/light_email.png');

        darkMode = false;
    }
});
