window.addEventListener('load', () => {
    const imageList = document.getElementById('imageList');

    fetch('/imgs')
       .then(response => response.text())
       .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const imageFiles = Array.from(htmlDoc.querySelectorAll('a[href]'))
               .map(link => link.getAttribute('href'))
               .filter(href => href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.gif') || href.endsWith('.jpeg'));

            let listHTML = '<ul>';
            const filenamesPerLine = 10; 
            for (let i = 0; i < imageFiles.length; i += filenamesPerLine) {
                listHTML += '<li>'; 
                for (let j = i; j < Math.min(i + filenamesPerLine, imageFiles.length); j++) {
                    listHTML += `/imgs/${imageFiles[j]}" alt="${imageFiles[j]}" />`; 
                }
                listHTML += '</li>';
            }
            listHTML += '</ul>';
            imageList.innerHTML = listHTML;
        })
       .catch(error => console.error('Error fetching images:', error));
});