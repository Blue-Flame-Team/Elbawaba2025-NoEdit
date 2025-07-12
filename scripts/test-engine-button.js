// اختبار زر محرك البحث
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 بدء اختبار زر محرك البحث...');
    
    // انتظار قليل للتأكد من تحميل جميع العناصر
    setTimeout(function() {
        testEngineButton();
    }, 1000);
    
    function testEngineButton() {
        // البحث عن جميع أزرار محرك البحث
        const engineButtons = document.querySelectorAll('.search-popup-button.engine');
        console.log(`✅ تم العثور على ${engineButtons.length} زر محرك البحث`);
        
        if (engineButtons.length === 0) {
            console.log('❌ لم يتم العثور على أزرار محرك البحث');
            return;
        }
        
        // اختبار كل زر
        engineButtons.forEach((button, index) => {
            console.log(`🔍 اختبار الزر رقم ${index + 1}:`);
            console.log('- النص:', button.textContent);
            console.log('- الفئة:', button.className);
            console.log('- مرئي:', button.offsetWidth > 0 && button.offsetHeight > 0);
            
            // إضافة مستمع أحداث جديد للتأكد
            button.addEventListener('click', function(e) {
                console.log('🎯 تم النقر على زر محرك البحث!');
                console.log('🔗 الانتقال إلى: http://127.0.0.1:5504/pages/general-search-engine.html');
                
                // التأكد من الانتقال
                e.preventDefault();
                window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
            });
        });
        
        console.log('✅ تم إعداد جميع أزرار محرك البحث بنجاح');
    }
    
    // إضافة زر اختبار في أعلى الصفحة
    function addTestButton() {
        const testButton = document.createElement('button');
        testButton.textContent = 'اختبار محرك البحث';
        testButton.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 9999;
            background: #ff6b35;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Droid Arabic Kufi', sans-serif;
        `;
        
        testButton.addEventListener('click', function() {
            console.log('🧪 اختبار يدوي لزر محرك البحث');
            window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
        });
        
        document.body.appendChild(testButton);
    }
    
    // إضافة زر الاختبار
    addTestButton();
    
    // مراقبة إضافة أزرار جديدة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.matches && node.matches('.search-popup-button.engine')) {
                        console.log('🆕 تم إضافة زر محرك البحث جديد');
                        node.addEventListener('click', function(e) {
                            console.log('🎯 تم النقر على زر محرك البحث الجديد!');
                            e.preventDefault();
                            window.location.href = 'http://127.0.0.1:5504/pages/general-search-engine.html';
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 