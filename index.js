window.addEventListener('scroll', function() {
    const scrollMoveContainer = document.getElementById('scroll-move-container');
    const introContainer = document.getElementById('intro-container');
    const scrollPosition = window.scrollY;
    const scrollImage = document.getElementById('');

    if (scrollPosition > 10) {
        scrollMoveContainer.classList.add('visible');
        introContainer.classList.add('middle');
        introContainer.style.left = '50%';
        introContainer.style.transform = 'translate(-50%, 0)';
    }
});

let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log(entry.target);
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = 'translateY(7%)';
        }
    });
});

let containers = document.querySelectorAll('.containers');
for(const container of containers) {
        observer.observe(container);
}

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

    icon.addEventListener('mousedown', (event) => {
        draggedIcon = event.target; // 드래그할 아이콘 설정
        offsetX = event.clientX - draggedIcon.getBoundingClientRect().left; // 클릭한 위치에서 아이콘의 왼쪽 가장자리까지의 거리
        offsetY = event.clientY - draggedIcon.getBoundingClientRect().top; // 클릭한 위치에서 아이콘의 위쪽 가장자리까지의 거리
    });

    icon.addEventListener('drag', (event) => {
        event.preventDefault();
        if (draggedIcon) {
            const containerRect = document.getElementById('skill-all-container').getBoundingClientRect();
            const newX = event.clientX - containerRect.left - offsetX; // 드래그 위치에서 오프셋을 빼줌
            const newY = event.clientY - containerRect.top - offsetY; // 드래그 위치에서 오프셋을 빼줌

            // 드래그 중 아이콘의 위치 업데이트
            draggedIcon.style.left = `${newX}px`;
            draggedIcon.style.top = `${newY}px`;
        }
    });

    icon.addEventListener('drop', (event) => {
        event.preventDefault(); // 기본 동작 방지
        draggedIcon = null; // 드래그가 끝났으므로 null로 설정
    });
});