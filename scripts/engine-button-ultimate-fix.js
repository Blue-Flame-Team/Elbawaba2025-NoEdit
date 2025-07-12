// الإصلاح الشامل والنهائي لزر محرك البحث
(function() {
    'use strict';
    
    const TARGET_URL = 'http://127.0.0.1:5504/pages/general-search-engine.html';
    
    console.log('🚀 بدء الإصلاح الشامل لزر محرك البحث...');
    
    // إصلاح فوري
    function immediateEngineButtonFix() {
        // إزالة جميع مستمعات الأحداث القديمة
        const existingButtons = document.querySelectorAll('.search-popup-button.engine');
        existingButtons.forEach(button => {
            // إنشاء نسخة جديدة من الزر لإزالة جميع مستمعات الأحداث
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // إضافة مستمع الأحداث الجديد
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 تم النقر على زر محرك البحث - الانتقال إلى:', TARGET_URL);
                window.location.href = TARGET_URL;
            });
            
            // إضافة فئة للتأكيد
            newButton.classList.add('engine-button-fixed');
            
            console.log('✅ تم إصلاح زر محرك البحث:', newButton.textContent);
        });
    }
    
    // إصلاح الأزرار الجديدة
    function fixNewEngineButtons() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            // البحث عن أزرار محرك البحث الجديدة
                            let buttonsToFix = [];
                            
                            if (node.matches && node.matches('.search-popup-button.engine')) {
                                buttonsToFix.push(node);
                            }
                            
                            const childButtons = node.querySelectorAll && node.querySelectorAll('.search-popup-button.engine');
                            if (childButtons) {
                                buttonsToFix = buttonsToFix.concat(Array.from(childButtons));
                            }
                            
                            buttonsToFix.forEach(button => {
                                if (!button.classList.contains('engine-button-fixed')) {
                                    button.addEventListener('click', function(e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('🎯 تم النقر على زر محرك البحث الجديد - الانتقال إلى:', TARGET_URL);
                                        window.location.href = TARGET_URL;
                                    });
                                    
                                    button.classList.add('engine-button-fixed');
                                    console.log('✅ تم إصلاح زر محرك البحث الجديد:', button.textContent);
                                }
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
    }
    
    // إعادة تعريف الوظائف العامة
    function overrideGlobalEngineFunction() {
        // إعادة تعريف أي وظائف عامة
        window.openSearchEngine = function() {
            console.log('🔗 فتح محرك البحث من الوظيفة العامة');
            window.location.href = TARGET_URL;
        };
        
        window.goToSearchEngine = function() {
            console.log('🔗 الانتقال إلى محرك البحث من الوظيفة العامة');
            window.location.href = TARGET_URL;
        };
    }
    
    // إضافة مستمعات أحداث إضافية
    function addGlobalEventListeners() {
        // مستمع عام للنقر على أي زر يحتوي على "محرك البحث"
        document.addEventListener('click', function(e) {
            const target = e.target;
            const button = target.closest('button');
            
            if (button && (
                button.classList.contains('search-popup-button') && button.classList.contains('engine') ||
                button.textContent.includes('محرك البحث')
            )) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 تم اكتشاف نقرة على زر محرك البحث عبر المستمع العام');
                window.location.href = TARGET_URL;
            }
        });
    }
    
    // تشغيل الإصلاح الدوري
    function startPeriodicFix() {
        setInterval(function() {
            const unfixedButtons = document.querySelectorAll('.search-popup-button.engine:not(.engine-button-fixed)');
            if (unfixedButtons.length > 0) {
                console.log(`🔧 تم العثور على ${unfixedButtons.length} أزرار غير مصلحة - جاري الإصلاح...`);
                immediateEngineButtonFix();
            }
        }, 3000);
    }
    
    // تشغيل جميع الإصلاحات
    function runAllFixes() {
        immediateEngineButtonFix();
        fixNewEngineButtons();
        overrideGlobalEngineFunction();
        addGlobalEventListeners();
        startPeriodicFix();
        
        console.log('🎉 تم تطبيق جميع الإصلاحات لزر محرك البحث');
    }
    
    // تشغيل الإصلاحات عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllFixes);
    } else {
        runAllFixes();
    }
    
    // تشغيل الإصلاحات عند تحميل النافذة
    window.addEventListener('load', function() {
        setTimeout(runAllFixes, 500);
    });
    
    // إضافة زر اختبار سريع
    function addQuickTestButton() {
        const testBtn = document.createElement('button');
        testBtn.innerHTML = '🧪 اختبار محرك البحث';
        testBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 99999;
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Droid Arabic Kufi', sans-serif;
            font-size: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        testBtn.addEventListener('click', function() {
            console.log('🧪 اختبار يدوي - الانتقال إلى محرك البحث');
            window.location.href = TARGET_URL;
        });
        
        document.body.appendChild(testBtn);
    }
    
    // إضافة زر الاختبار
    setTimeout(addQuickTestButton, 1000);
    
    console.log('✅ تم تحميل الإصلاح الشامل لزر محرك البحث');
})(); 