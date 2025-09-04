function loadTabs(activePage) {
    const tabs = [
        {
            id: 'home',
            name: 'Головна',
            url: '/',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>'
        },
        {
            id: 'education',
            name: 'Освіта',
            url: '/education/',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-certificate"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" /><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" /><path d="M6 9l12 0" /><path d="M6 12l3 0" /><path d="M6 15l2 0" /></svg>'
        },
        {
            id: 'gear',
            name: 'Техніка',
            url: '/gear/',
            icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mouse"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z" /><path d="M12 7l0 4" /></svg>'
        },
        {
            id: 'other',
            name: 'Інше',
            url: '/other/',
            icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-layers-selected"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 10.5l6.492 -6.492" /><path d="M13.496 16l6.504 -6.504z" /><path d="M8.586 15.414l10.827 -10.827" /><path d="M8 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" /></svg>'
        }
    ];

    // Get the container
    const tabsContainer = document.getElementById('tabs-container');
    if (!tabsContainer) {
        console.error('Tabs container not found');
        return;
    }

    // Create the tabs HTML
    let tabsHtml = '<div class="tabs">';
    
    tabs.forEach(tab => {
        // Only set a tab as active if activePage is not null/undefined and matches the tab ID
        const isActive = activePage && tab.id === activePage;
        
        if (isActive) {
            // Active tab
            tabsHtml += `
                <div class="tab tab-active">
                    ${tab.icon}
                    <span class="tab-name">
                        ${tab.name}
                    </span>
                </div>
            `;
        } else {
            // Regular tab with link
            tabsHtml += `
                <a href="${tab.url}" class="tab">
                    ${tab.icon}
                    <span class="tab-name">
                        ${tab.name}
                    </span>
                </a>
            `;
        }
    });
    
    tabsHtml += '</div>';
    
    // Set the HTML
    tabsContainer.innerHTML = tabsHtml;
}

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get active page from data attribute
    const tabsContainer = document.getElementById('tabs-container');
    
    // Check if the data-active-page attribute exists
    const hasActivePageAttr = tabsContainer && tabsContainer.hasAttribute('data-active-page');
    
    // Only pass the active page value if the attribute exists
    const activePage = hasActivePageAttr ? tabsContainer.getAttribute('data-active-page') : null;
    
    loadTabs(activePage);
});