document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Splash Screen Loading Logic
    // ==========================================
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercent = document.getElementById('loading-percent');
    
    let progress = 0;
    
    // Simulate a loading sequence
    const loadingInterval = setInterval(() => {
        // Increment randomly between 5 and 20 for a realistic feel
        progress += Math.floor(Math.random() * 15) + 5; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Pause briefly at 100% before fading out
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                
                // Remove from DOM entirely after the CSS transition finishes
                setTimeout(() => {
                    if (splashScreen.parentNode) {
                        splashScreen.parentNode.removeChild(splashScreen);
                    }
                }, 400);
            }, 500); 
        }
        
        // Update UI
        loadingBar.style.width = `${progress}%`;
        loadingPercent.textContent = `${progress}%`;
    }, 150);


    // ==========================================
    // 2. Drawer (Sidebar) Navigation Logic
    // ==========================================
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    function openDrawer() {
        drawer.classList.add('open');
        drawerOverlay.classList.add('show');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('show');
    }

    // Event Listeners for Drawer
    menuToggleBtn.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer); // Close when clicking outside


    // ==========================================
    // 3. Header Options Dropdown Logic
    // ==========================================
    const optionsToggleBtn = document.getElementById('options-toggle-btn');
    const optionsDropdown = document.getElementById('options-dropdown');

    optionsToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the document click listener from firing immediately
        optionsDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking anywhere else on the screen
    document.addEventListener('click', (e) => {
        if (!optionsToggleBtn.contains(e.target) && !optionsDropdown.contains(e.target)) {
            optionsDropdown.classList.remove('show');
        }
    });


    // ==========================================
    // 4. Tab Switching Architecture
    // ==========================================
    // Grab all elements that act as navigation triggers (drawer buttons and dropdown items)
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
            
            // 1. Hide all tab content sections
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // 2. Remove active state from all drawer navigation buttons
            document.querySelectorAll('.drawer-nav-btn').forEach(btn => btn.classList.remove('active'));
            
            // 3. Show the targeted tab
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
            
            // 4. Highlight the clicked button (if it's in the drawer menu)
            if (trigger.classList.contains('drawer-nav-btn')) {
                trigger.classList.add('active');
            }

            // 5. Update the top header title based on the active tab
            if (sectionTitles[targetId]) {
                headerTitleText.textContent = sectionTitles[targetId];
            }

            // 6. Clean up UI: Close drawer and dropdowns
            closeDrawer();
            optionsDropdown.classList.remove('show');
        });
    });


    // ==========================================
    // 5. Chat Input UI Simulation
    // ==========================================
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    function appendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Create the HTML structure for a user message
        const messageHTML = `
            <div class="message-wrapper user">
                <div class="sender-name">You</div>
                <div class="message-bubble">${text}</div>
            </div>
        `;
        
        // Append to the chat container
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        
        // Clear input field
        chatInput.value = '';
        
        // Auto-scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Trigger send on button click
    if (sendBtn) {
        sendBtn.addEventListener('click', appendUserMessage);
    }

    // Trigger send on "Enter" key press
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                appendUserMessage();
            }
        });
    }
});
      
