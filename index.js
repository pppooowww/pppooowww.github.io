window.addEventListener('scroll', function() {
    const scrollMoveContainer = document.getElementById('scroll-move-container');
    const introContainer = document.getElementById('intro-container');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10) {
        scrollMoveContainer.classList.add('visible');
        introContainer.classList.add('middle');
        introContainer.style.left = '50%';
        introContainer.style.transform = 'translate(-50%, 0)';
    }
});


/*************************************************************/
const skillIcons = document.querySelectorAll('.skill-icons');
let draggedIcon = null;

function setRandomPosition(icon, positions) {
    const container = document.getElementById('skill-all-container');
    const containerRect = container.getBoundingClientRect();
    let randomX, randomY;
    let isOverlapping = true;

    while (isOverlapping) {
        randomX = Math.random() * (containerRect.width - icon.offsetWidth);
        randomY = Math.random() * (containerRect.height - icon.offsetHeight);

        // 겹치는지 확인
        isOverlapping = positions.some(pos => {
            const distance = Math.sqrt(
                Math.pow(pos.x - randomX, 2) + Math.pow(pos.y - randomY, 2)
            );
            return distance < (icon.offsetWidth + 10);
        });
    }

    // 아이콘의 위치 설정
    icon.style.left = `${randomX}px`;
    icon.style.top = `${randomY}px`;
    icon.style.position = 'absolute';

    // 설정한 위치를 저장
    positions.push({ x: randomX, y: randomY });
}

// 각 아이콘에 대해 랜덤 위치 설정
const positions = []; // 아이콘의 위치를 저장할 배열
skillIcons.forEach(icon => {
    setRandomPosition(icon, positions);

    icon.addEventListener('dragstart', (event) => {
        draggedIcon = icon; // 드래그 시작 시 draggedIcon 설정
        icon.classList.add('dragging'); // dragging 클래스 추가
        event.dataTransfer.effectAllowed = "move"; // 이동 효과 허용
    });

    icon.addEventListener('dragend', () => {
        draggedIcon = null; // 드래그 종료 시 초기화
        icon.classList.remove('dragging'); // dragging 클래스 제거
    });

    icon.addEventListener('dragover', (event) => {
        event.preventDefault(); // 기본 동작 방지
    });

    icon.addEventListener('drop', (event) => {
        event.preventDefault(); // 기본 동작 방지
        if (draggedIcon) {
            const containerRect = document.getElementById('skill-all-container').getBoundingClientRect();
            const offsetX = event.clientX - containerRect.left; // 드랍 위치의 X 좌표
            const offsetY = event.clientY - containerRect.top; // 드랍 위치의 Y 좌표

            // 드래그한 아이콘의 위치 업데이트
            draggedIcon.style.left = `${offsetX - (draggedIcon.offsetWidth / 2)}px`; // 중앙 정렬
            draggedIcon.style.top = `${offsetY - (draggedIcon.offsetHeight / 2)}px`; // 중앙 정렬
        }
    });

    // 드래그 시작 시 위치를 고정하기 위해 mousemove 이벤트 추가
    icon.addEventListener('drag', (event) => {
        if (event.clientX && event.clientY) {
            const containerRect = document.getElementById('skill-all-container').getBoundingClientRect();
            const offsetX = event.clientX - containerRect.left; // 드래그 위치의 X 좌표
            const offsetY = event.clientY - containerRect.top; // 드래그 위치의 Y 좌표

            // 드래그 중 아이콘의 위치 업데이트
            draggedIcon.style.left = `${offsetX - (draggedIcon.offsetWidth / 2)}px`; // 중앙 정렬
            draggedIcon.style.top = `${offsetY - (draggedIcon.offsetHeight / 2)}px`; // 중앙 정렬
        }
    });
});