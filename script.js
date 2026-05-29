document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.header');

    // Menu Responsivo
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = hamburgerBtn.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'translateY(8px) rotate(45deg)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'translateY(-8px) rotate(-45deg)' : 'none';
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburgerBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    //Rolagem Suave Inteligente com Compensação de Cabeçalho Fixo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    //Highlight Ativo de Navegação conforme Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        const scrollPosition = window.pageYOffset + header.offsetHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

//Sistema Dinâmico de Alternância de Abas (WhatsApp / E-mail)
function switchTab(event, tabId) {

    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));


    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    if (event) {
        event.currentTarget.classList.add('active');
    } else {
        const activeBtn = document.querySelector(`.tab-btn[onclick*="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Forçar ativação da aba de e-mail ao clicar no botão flutuante/hero de e-mail
function forceEmailTab() {
    const emailBtn = document.querySelector('.tab-btn[onclick*="email-tab"]');
    if (emailBtn) {
        // Simula o clique estruturado na aba
        const mockEvent = { currentTarget: emailBtn };
        switchTab(mockEvent, 'email-tab');
    }
}

// Fazer com que o botão de e-mail da dobra principal ative a aba diretamente
const heroMailBtn = document.getElementById('heroMailBtn');
if (heroMailBtn) {
    heroMailBtn.addEventListener('click', () => {
        forceEmailTab();
    });
}

// 5. Tratamento de Envio do Formulário de E-mail 
function handleEmailSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const emailDestination = "dravictoriaalbino@gmail.com";
    const subject = encodeURIComponent(`Solicitação de Consulta - ${name}`);
    
    const bodyMessage = encodeURIComponent(
        `Olá Dra. Victória Albino,

Gostaria de solicitar informações de agendamento de consulta.

` +
        `• Nome do Paciente: ${name}
` +
        `• Telefone de Contato: ${phone}
` +
        `• Detalhes/Motivo: ${message}

` +
        `Enviado através da Landing Page Oficial.`
    );
    
    window.location.href = `mailto:${emailDestination}?subject=${subject}&body=${bodyMessage}`;
}