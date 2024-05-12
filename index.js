// Fetch images from imgs folder and display them in a list
window.addEventListener('load', () => {
    const imageList = document.getElementById('imageList');
    
    // Fetch list of images from imgs folder
    fetch('./imgs')
        .then(response => response.text())
        .then(data => {
            // Extract image filenames from directory listing
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const imageFiles = Array.from(htmlDoc.querySelectorAll('a[href]'))
                .map(link => link.getAttribute('href'))
                .filter(href => href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.gif'));

            // Display image filenames in a list with limited filenames per line
            let listHTML = '<ul>';
            const filenamesPerLine = 10; // Adjust as needed
            for (let i = 0; i < imageFiles.length; i += filenamesPerLine) {
                listHTML += '<li>'; // Start list item
                for (let j = i; j < Math.min(i + filenamesPerLine, imageFiles.length); j++) {
                    listHTML += ` • ${imageFiles[j]}`; // Add bullet point and filename
                }
                listHTML += '</li>'; 
            }
            listHTML += '</ul>';
            imageList.innerHTML = listHTML; 
        })
        .catch(error => console.error('Error fetching images:', error));
});
