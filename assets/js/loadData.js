function loadAbouts() {
    fetch('assets/data/abouts.json')
    .then(response => response.json())
    .then(abouts => {
        const aboutContainer = document.getElementById('abouts-list');
        
        abouts.forEach(about => {
            const aboutItemsHTML = about.items.map(item => `<br />- ${item}`).join('');
            const aboutHTML = `
                <p>
                    <strong>${about.title}:</strong>
                    ${aboutItemsHTML}
                </p>
            `;
            aboutContainer.innerHTML += aboutHTML;
        });
    })
    .catch(error => {
        console.error('Error loading the abouts:', error);
    });
}

function loadExperiences() {
    fetch('assets/data/experiences.json')
    .then(response => response.json())
    .then(experiences => {
        const workContainer = document.getElementById('work-list');
        const educationContainer = document.getElementById('education-list');
        
        experiences.forEach(experience => {
            const newLineDesc = experience.description.replace(/\n/g, '<br>');
            const experienceHTML = `
                <li>
                    <time class="exp-date">
                        <span><b>${experience.date}</b></span>
                    </time>
                    <div class="exp-icon"></div>
                    <div class="exp-card">
                        <h4>
                            <strong>${experience.location}</strong> |
                            <em>${experience.title}</em>
                        </h4>
                        <p>${newLineDesc}</p>
                        <br />
                        <img class="img-fluid w-100" src="${experience.image}" alt=""/>
                    </div>
                </li>
            `;
            if (experience.experience) {
                workContainer.innerHTML += experienceHTML;
            } else {
                educationContainer.innerHTML += experienceHTML;
            }
        });
    })
    .catch(error => {
        console.error('Error loading the experiences:', error);
    });
}

function loadProjects() {
    fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectsContainer = document.getElementById('projects-list');
        const hiddenContainer = document.getElementById('hidden-projects');
        
        projects.forEach(project => {
            const projectHTML = `
                <div class="row project text-left align-items-center">
                    <div class="col-xs-12 col-lg-6">
                        <div class="proj-img">
                            <img class="img-fluid" src="${project.image}" alt="${project.title}" />
                        </div>
                    </div>
                    <div class="col-xs-12 col-lg-6">
                        <div class="proj-title">${project.title}</div>
                        <div class="proj-desc">${project.subtitle}</div>
                        <p>${project.description}</p>
                        ${project.subpage ? `<div class="proj-desc"><a href="${project.subpage}">Privacy Policy</a></div>` : ''}
                        <button class="btn" onclick="window.open('${project.github}','_blank')">GitHub</button>
                        <button class="btn play-video" data-video-id="${project.demo}">Demo</button>
                    </div>
                </div>
            `;
            if (project.visible) {
                projectsContainer.innerHTML += projectHTML;
            } else {
                hiddenContainer.innerHTML += projectHTML;
            }
        });
    })
    .catch(error => {
        console.error('Error loading the projects:', error);
    });
}

function loadHobbies() {
    fetch('assets/data/hobbies.json')
    .then(response => response.json())
    .then(hobbies => {
        const hobbiesContainer = document.getElementById('hobbies-list');
    
        hobbies.forEach(hobby => {
            const hobbyHTML = `
                <div class="row project text-left align-items-center">
                    <div class="col-xs-12 col-lg-6">
                        <div class="proj-title">${hobby.title}</div>
                        <p>${hobby.description}</p>
                        ${hobby.subpage ? `<div class="proj-desc"><a href="${hobby.subpage}">Interactive Menu</a></div>` : ''}
                    </div>
                    <div class="col-xs-12 col-lg-6">
                        <div class="proj-img">
                            <img class="img-fluid" src="${hobby.image}" alt="${hobby.title}" />
                        </div>
                    </div>
                </div>
            `;
        
            hobbiesContainer.innerHTML += hobbyHTML;
        });
    })
    .catch(error => {
        console.error('Error loading the hobbies:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAbouts();
    loadExperiences();
    loadProjects();
    loadHobbies();
});