const initFormHandler = () => {
    const form = document.getElementById('contactForm');
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    const btnEmail = document.getElementById('btnEmail');

    if (!form) return;

    const setInvalid = (id, message) => {
        const el = document.getElementById(id);
        el.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        el.focus();
        console.warn(`Validation failed: ${message}`);
    };

    const clearValidation = () => {
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        });
    };

    const validateForm = () => {
        clearValidation();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre.length < 3) {
            setInvalid('nombre', 'Nombre demasiado corto');
            return null;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setInvalid('email', 'Email inválido');
            return null;
        }

        if (telefono.length < 5) {
            setInvalid('telefono', 'Teléfono inválido');
            return null;
        }

        if (asunto.length < 3) {
            setInvalid('asunto', 'Asunto requerido');
            return null;
        }

        if (mensaje.length < 5) {
            setInvalid('mensaje', 'Mensaje demasiado corto');
            return null;
        }

        return { nombre, email, telefono, asunto, mensaje };
    };

    const handleWhatsappSubmit = () => {
        const data = validateForm();
        if (!data) return;

        const codigo = document.getElementById('codigoPais').value;
        const fullPhone = codigo ? `${codigo}${data.telefono}` : data.telefono;

        const texto = encodeURIComponent(
            `*PORTAFOLIO WEB - CONTACTO*\n\n` +
            `*Nombre:* ${data.nombre}\n` +
            `*Email:* ${data.email}\n` +
            `*Teléfono:* +${fullPhone}\n` +
            `*Asunto:* ${data.asunto}\n\n` +
            `*Mensaje:* ${data.mensaje}`
        );

        window.open(`https://wa.me/59174059430?text=${texto}`, '_blank');
    };

    const handleEmailSubmit = () => {
        const data = validateForm();
        if (!data) return;

        const subject = encodeURIComponent(`PORTAFOLIO: ${data.asunto}`);
        const body = encodeURIComponent(
            `Nombre: ${data.nombre}\n` +
            `Email: ${data.email}\n` +
            `Teléfono: ${data.telefono}\n\n` +
            `Mensaje:\n${data.mensaje}`
        );

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jtittoy@gmail.com&su=${subject}&body=${body}`;

        window.open(gmailUrl, '_blank');
    };

    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', handleWhatsappSubmit);
    } else {
        console.error('Botón WhatsApp no encontrado');
    }

    if (btnEmail) {
        btnEmail.addEventListener('click', handleEmailSubmit);
    } else {
        console.error('Botón Email no encontrado');
    }
};

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHandler);
    } else {
        initFormHandler();
    }
}
