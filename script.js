document.addEventListener('DOMContentLoaded', function() {
    try {
        const projectLinks = document.querySelectorAll('.project-link');
        const welcomeMessage = document.querySelector('.welcome-message');
        
        if (!projectLinks.length) {
            console.warn('No project links found');
            return;
        }
        
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                try {

                    const targetId = this.getAttribute('href').substring(1);
                    const targetProject = document.getElementById(targetId);
                    

                    if (targetProject) {

                        document.querySelectorAll('.project-detail').forEach(detail => {
                            detail.classList.add('hidden');
                        });
                        
                        if (welcomeMessage) {
                            welcomeMessage.classList.add('hidden');
                        }
                        
                        targetProject.classList.remove('hidden');
                    } else {
                        console.error(`Project with id "${targetId}" not found`);
                    }
                } catch (err) {
                    console.error('Error handling project click:', err);
                }
            });
        });
    } catch (err) {
        console.error('Error initializing project links:', err);
    }
}); 