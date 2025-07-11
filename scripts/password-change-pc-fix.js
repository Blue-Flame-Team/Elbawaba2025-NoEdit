// Fix password change button for PC
document.addEventListener('DOMContentLoaded', function() {
    
    function findAndBindPasswordButtons() {
        
        // Search in all possible elements
        const allElements = document.querySelectorAll('a, button, .btn, .dashboard-btn, .menu-item, .list-item, [onclick], [data-action]');
        
        allElements.forEach((element, index) => {
            const text = element.textContent || element.innerText || '';
            const href = element.getAttribute('href') || '';
            const onclick = element.getAttribute('onclick') || '';
            const title = element.getAttribute('title') || '';
            
            // Search for password-related content
            const isPasswordButton = 
                text.includes('كلمة المرور') ||
                text.includes('تعديل كلمة') ||
                text.includes('تغيير كلمة') ||
                text.includes('كلمة السر') ||
                href.includes('password') ||
                onclick.includes('password') ||
                title.includes('كلمة المرور');
            
            if (isPasswordButton && 
                !element.hasAttribute('data-pc-password-fixed') &&
                element.tagName !== 'SCRIPT' &&
                element.tagName !== 'STYLE') {
                
                
                // Remove existing events and links
                element.removeAttribute('href');
                element.removeAttribute('onclick');
                element.style.cursor = 'pointer';
                
                // Create new element to remove old event listeners
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                
                // Add new event listener
                newElement.addEventListener('click', function(e) {
                    
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // Hide all open modals
                    const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"], .popup, [class*="popup"]');
                    
                    allModals.forEach(modal => {
                        if (modal && modal.style) {
                            modal.style.display = 'none';
                            modal.style.visibility = 'hidden';
                            modal.style.opacity = '0';
                        }
                    });
                    
                    // Open password change modal
                    if (window.showPasswordChangeModal) {
                        window.showPasswordChangeModal();
                    } else {

                    }
                    
                    return false;
                }, true);
                
                newElement.setAttribute('data-pc-password-fixed', 'true');
            }
        });
    }
    
    // Run search immediately
    findAndBindPasswordButtons();
    
    // Re-search after different intervals
    setTimeout(findAndBindPasswordButtons, 500);
    setTimeout(findAndBindPasswordButtons, 1000);
    setTimeout(findAndBindPasswordButtons, 2000);
    setTimeout(findAndBindPasswordButtons, 3000);
    
    // Monitor clicks on profile-related elements
    document.addEventListener('click', function(e) {
        const target = e.target;
        const text = target.textContent || target.innerText || '';
        const className = target.className || '';
        const id = target.id || '';
        
        const isProfileRelated = 
            text.includes('الملف الشخصي') ||
            text.includes('profile') ||
            text.includes('الحساب') ||
            text.includes('تسجيل الدخول') ||
            className.includes('profile') ||
            id.includes('profile');
        
        if (isProfileRelated) {
            setTimeout(findAndBindPasswordButtons, 100);
            setTimeout(findAndBindPasswordButtons, 300);
        }
    });
    
});
