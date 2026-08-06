// ==========================================
// 1. Splash Screen Loading Logic
// ==========================================
const splashScreen = document.getElementById('splash-screen');
const loadingBar = document.getElementById('loading-bar');
const loadingPercent = document.getElementById('loading-percent');

if (splashScreen && loadingBar && loadingPercent) {
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                setTimeout(() => {
                    if (splashScreen.parentNode) {
                        splashScreen.parentNode.removeChild(splashScreen);
                    }
                }, 400);
            }, 500); 
        }
        
        loadingBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${progress}%`;
    }, 150);
} else {
    console.error("NOVA AI: Loading elements not found. Check HTML IDs.");
}

// ==========================================
// 2. Drawer (Sidebar) Navigation Logic
// ==========================================
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerCloseBtn = document.getElementById('drawer-close-btn');

if (menuToggleBtn && drawer && drawerOverlay && drawerCloseBtn) {
    function openDrawer() {
        drawer.classList.add('open');
        drawerOverlay.classList.add('show');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('show');
    }

    menuToggleBtn.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
}

// ==========================================
// 3. Header Options Dropdown Logic
// ==========================================
const optionsToggleBtn = document.getElementById('options-toggle-btn');
const optionsDropdown = document.getElementById('options-dropdown');

if (optionsToggleBtn && optionsDropdown) {
    optionsToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!optionsToggleBtn.contains(e.target) && !optionsDropdown.contains(e.target)) {
            optionsDropdown.classList.remove('show');
        }
    });
}

// ==========================================
// 4. Tab Switching Architecture
// ==========================================
const navTriggers = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('.tab-content');
const headerTitleText = document.querySelector('.header-title span:first-child');

const sectionTitles = {
    'command-center': 'NOVA AI',
    'task-center': 'Task Center',
    'ai-reader': 'AI Reader',
    'settings': 'Settings'
};

navTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        
        tabContents.forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.drawer-nav-btn').forEach(btn => btn.classList.remove('active'));
        
        const targetTab = document.getElementById(targetId);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        if (trigger.classList.contains('drawer-nav-btn')) {
            trigger.classList.add('active');
        }

        if (headerTitleText && sectionTitles[targetId]) {
            headerTitleText.textContent = sectionTitles[targetId];
        }

        if (drawer) drawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('show');
        if (optionsDropdown) optionsDropdown.classList.remove('show');
    });
});

// ==========================================
// 5. Chat Input UI Simulation
// ==========================================
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

if (chatInput && sendBtn && chatMessages) {
    function appendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const messageHTML = `
            <div class="message-wrapper user">
                <div class="sender-name">You</div>
                <div class="message-bubble">${text}</div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', appendUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendUserMessage();
        }
    });
}
