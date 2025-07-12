// Test script to verify all contact links are working properly
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testing contact links functionality...');
    
    // Test 1: Check if contact section exists
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        console.log('✓ Contact section found with ID "contact"');
    } else {
        console.log('✗ Contact section not found');
    }
    
    // Test 2: Check search engine button functionality
    const searchEngineButtons = document.querySelectorAll('.search-popup-button.engine');
    console.log(`Found ${searchEngineButtons.length} search engine buttons`);
    
    // Test 3: Check mobile call icons
    const mobileCallIcons = document.querySelectorAll('.mobile-icons .icon-btn img[src*="call"], .mobile-icons .icon-btn img[alt*="اتصال"]');
    console.log(`Found ${mobileCallIcons.length} mobile call icons`);
    
    // Test 4: Check desktop call icons
    const desktopCallIcons = document.querySelectorAll('.main-icons-group .icon-btn img[src*="call"], .main-icons-group .icon-btn img[alt*="اتصال"]');
    console.log(`Found ${desktopCallIcons.length} desktop call icons`);
    
    // Test 5: Check support icons
    const supportIcons = document.querySelectorAll('.support-icon-fixed, .support-icon-fixed img');
    console.log(`Found ${supportIcons.length} support icons`);
    
    // Test 6: Check if support icons have cursor pointer
    supportIcons.forEach((icon, index) => {
        const computedStyle = window.getComputedStyle(icon);
        if (computedStyle.cursor === 'pointer') {
            console.log(`✓ Support icon ${index + 1} has cursor pointer`);
        } else {
            console.log(`✗ Support icon ${index + 1} missing cursor pointer`);
        }
    });
    
    // Test 7: Verify page type detection
    const isSubpage = window.location.pathname.includes('/pages/');
    console.log(`Current page type: ${isSubpage ? 'Subpage' : 'Main page'}`);
    
    console.log('Contact links test completed!');
});

// Function to manually test contact navigation
function testContactNavigation() {
    console.log('Testing contact navigation...');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        console.log('✓ Successfully scrolled to contact section');
    } else {
        console.log('✗ Contact section not found for navigation test');
    }
}

// Export test function for manual testing
window.testContactNavigation = testContactNavigation; 