async function loadProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        
        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            
            projectElement.innerHTML = `
                <img class="project-banner" src="${project.banner}" alt="${project.name}">
                <div class="project-info">
                    <span class="project-name">${project.name}</span>
                    <br>
                    <span class="project-description">${project.description}</span>
                    <div class="social-buttons-container">
                        ${project.code ? `<a href="${project.code}" target="_blank" class="social-button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                            Код
                        </a>` : ''}
                        ${project.published ? `<a href="${project.published}" target="_blank" class="social-button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-google-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607z" /><path d="M15 9l-10.5 11.5" /><path d="M4.5 3.5l10.5 11.5" /></svg>
                            Продукт
                        </a>` : ''}
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectElement);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);