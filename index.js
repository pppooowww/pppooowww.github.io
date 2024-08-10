window.addEventListener('scroll', function() {
    const scrollMoveContainer = document.getElementById('scroll-move-container');
    const introContainer = document.getElementById('intro-container');
    const scrollPosition = window.scrollY;

    // 스크롤 위치가 100px 이상일 때 이미지 나타남
    if (scrollPosition > 50) {
        scrollMoveContainer.classList.add('visible');
        introContainer.classList.add('middle');
        introContainer.style.left = '50%';
        introContainer.style.transform = 'translate(-50%, 0)';
    }
});


