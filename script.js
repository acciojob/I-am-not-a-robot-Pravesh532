 const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
        let randomizedImages = [];
        let selectedTiles = [];
        
        function shuffleImages() {
            let imagesCopy = [...images];
            let duplicate = imagesCopy[Math.floor(Math.random() * imagesCopy.length)];
            imagesCopy.push(duplicate);
            randomizedImages = imagesCopy.sort(() => Math.random() - 0.5);
        }
        
        function displayImages() {
            const container = document.getElementById('image-container');
            container.innerHTML = '';
            randomizedImages.forEach((src, index) => {
                let img = document.createElement('img');
                img.src = src;
                img.classList.add('tile');
                img.dataset.index = index;
                img.onclick = () => selectTile(img, src);
                container.appendChild(img);
            });
        }
        
        function selectTile(img, src) {
            if (selectedTiles.length < 2 && !img.classList.contains('selected')) {
                img.classList.add('selected');
                selectedTiles.push({ img, src });
                document.getElementById('reset').style.display = 'block';
                if (selectedTiles.length === 2) {
                    document.getElementById('verify').style.display = 'block';
                }
            }
        }
        
        function verifySelection() {
            const message = document.getElementById('para');
            if (selectedTiles[0].src === selectedTiles[1].src) {
                message.textContent = "You are a human. Congratulations!";
            } else {
                message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            }
            document.getElementById('verify').style.display = 'none';
        }
        
        function resetGame() {
            selectedTiles.forEach(tile => tile.img.classList.remove('selected'));
            selectedTiles = [];
            document.getElementById('para').textContent = '';
            document.getElementById('reset').style.display = 'none';
            document.getElementById('verify').style.display = 'none';
        }
        
        shuffleImages();
        displayImages();