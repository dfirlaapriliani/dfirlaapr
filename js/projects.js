// ===========================
// SHOW MORE TOGGLE
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenItems = document.querySelectorAll('.project-item.hidden');
    let expanded = false;

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            expanded = !expanded;
            hiddenItems.forEach(item => item.classList.toggle('hidden'));
            showMoreBtn.textContent = expanded ? 'Show Less' : 'Show More';
        });
    }
});

// ===========================
// MODAL FUNCTIONALITY
// ===========================
function openModal(imgSrc, title, desc) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    
    if (modal && modalImg && modalTitle && modalDesc) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});