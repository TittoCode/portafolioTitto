/**
 * WhatsApp Form Handler - Static Version
 */
const initFormHandler = () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnContent = document.getElementById('btnContent');

    if (!form) return;

    // Helper for validation feedback
    const setInvalid = (id, message) => {
        const el = document.getElementById(id);
        el.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        el.focus();

        // Show a small tooltip or alert if needed
        console.warn(`Validation failed: ${message}`);
    };

    const clearValidation = () => {
        form.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        });
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        clearValidation();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const codigo = document.getElementById('codigoPais').value;
        const telefono = document.getElementById('telefono').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Basic Validations
        if (nombre.length < 3) {
            setInvalid('nombre', 'Nombre demasiado corto');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setInvalid('email', 'Email inválido');
            return;
        }

        if (telefono.length < 7) {
            setInvalid('telefono', 'Teléfono inválido');
            return;
        }

        if (asunto.length < 5) {
            setInvalid('asunto', 'Asunto demasiado breve');
            return;
        }

        if (mensaje.length < 10) {
            setInvalid('mensaje', 'Mensaje demasiado corto');
            return;
        }

        // Visual Feedback for "Sending"
        const originalContent = btnContent.innerHTML;
        submitBtn.disabled = true;
        btnContent.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Abriendo WhatsApp...
        `;

        const texto = encodeURIComponent(
            `*PORTAFOLIO WEB*\n\n` +
            `👤 *Nombre:* ${nombre}\n` +
            `📧 *Email:* ${email}\n` +
            `✍️ *Asunto:* ${asunto}\n\n` +
            `💬 *Mensaje:* ${mensaje}`
        );

        const url = `https://wa.me/59174059430?text=${texto}`;

        // Small delay to simulate processing and show the animation
        setTimeout(() => {
            window.open(url, '_blank');
            submitBtn.disabled = false;
            btnContent.innerHTML = originalContent;
            form.reset();
        }, 800);
    };
};

// Auto-init for static loading
if (typeof document !== 'undefined') {
    window.initFormHandler = initFormHandler;
}
