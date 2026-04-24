document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const popup = document.getElementById('popup');
    const loading = document.getElementById('loading');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const popupOkBtn = document.getElementById('popup-ok-btn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Show loading
            if (loading) loading.classList.remove('hidden');
            if (btnText) btnText.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                // Hide loading
                if (loading) loading.classList.add('hidden');
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');

                if (response.ok) {
                    // Show popup
                    if (popup) {
                        popup.classList.remove('opacity-0', 'pointer-events-none');
                    }
                    form.querySelector('button[type="submit"]').disabled = true;
                    if (popupOkBtn) popupOkBtn.focus();
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            })
            .catch(() => {
                if (loading) loading.classList.add('hidden');
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
                alert("Oops! Network error. Please check your connection.");
            });
        });
    }

    // Popup OK button
    if (popupOkBtn) {
        popupOkBtn.addEventListener('click', () => {
            if (popup) {
                popup.classList.add('opacity-0', 'pointer-events-none');
            }
            if (form) {
                form.reset();
                form.querySelector('button[type="submit"]').disabled = false;
            }
        });
    }
});