// إصلاح مشكلة نوافذ تعديل كلمة المرور المكررة
document.addEventListener('DOMContentLoaded', function() {
    
    // دالة فتح نافذة استرداد كلمة المرور
    function showForgotPasswordModal() {
        const forgotModal = document.getElementById('forgot-password-modal');
        if (forgotModal) {
            forgotModal.style.display = 'flex';
            forgotModal.style.alignItems = 'center';
            forgotModal.style.justifyContent = 'center';
            forgotModal.style.position = 'fixed';
            forgotModal.style.zIndex = '99999';
            forgotModal.style.left = '0';
            forgotModal.style.top = '0';
            forgotModal.style.width = '100%';
            forgotModal.style.height = '100%';
            forgotModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            
            document.body.style.overflow = 'hidden';
            
            // تركيز على حقل اسم المستخدم
            setTimeout(() => {
                const usernameInput = forgotModal.querySelector('.forgot-password-input');
                if (usernameInput) {
                    usernameInput.focus();
                }
            }, 100);
            
        } else {

        }
    }
    
    // دالة إغلاق نافذة استرداد كلمة المرور
    function closeForgotPasswordModal() {
        const forgotModal = document.getElementById('forgot-password-modal');
        if (forgotModal) {
            forgotModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // مسح الحقل
            const usernameInput = forgotModal.querySelector('.forgot-password-input');
            if (usernameInput) {
                usernameInput.value = '';
            }
        }
    }
    
    // إعداد نافذة استرداد كلمة المرور
    function setupForgotPasswordModal() {
        const forgotModal = document.getElementById('forgot-password-modal');
        if (!forgotModal) return;
        
        // إعداد أزرار الإغلاق
        forgotModal.addEventListener('click', function(e) {
            if (e.target === forgotModal) {
                closeForgotPasswordModal();
            }
        });
        
        // زر الإرسال
        const submitBtn = forgotModal.querySelector('.forgot-password-submit-btn');
        if (submitBtn && !submitBtn.hasAttribute('data-forgot-setup')) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const usernameInput = forgotModal.querySelector('.forgot-password-input');
                
                if (!usernameInput || usernameInput.value.trim() === '') {
                    alert('يرجى إدخال اسم المستخدم');
                    return;
                }
                
                
                // تأثير بصري
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'جاري الإرسال...';
                submitBtn.disabled = true;
                
                // محاكاة الإرسال
                setTimeout(() => {
                    alert('تم إرسال رابط استرداد كلمة المرور إلى بريدك الإلكتروني');
                    closeForgotPasswordModal();
                    
                    // إعادة تعيين الزر
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            });
            submitBtn.setAttribute('data-forgot-setup', 'true');
        }
    }
    
    // حذف جميع النوافذ المكررة
    function cleanDuplicateModals() {
        const duplicateModals = document.querySelectorAll('#password-change-modal');
        
        // حذف جميع النوافذ المكررة
        duplicateModals.forEach((modal, index) => {
            if (modal) {
                modal.remove();
            }
        });
        
        // حذف أي نوافذ أخرى بنفس الكلاس
        const classModals = document.querySelectorAll('.password-change-modal');
        classModals.forEach((modal, index) => {
            if (modal) {
                modal.remove();
            }
        });
    }
    
    // إنشاء نافذة جديدة نظيفة
    function createCleanModal() {
        // إنشاء HTML النافذة الجديدة بنفس الـ ID المتوقع
        const modalHTML = `
            <div id="password-change-modal" style="
                display: none;
                position: fixed;
                z-index: 99999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                direction: rtl;
                overflow: auto;
                padding-top: 60px;
            ">
                <div style="
                    background-color: white;
                    margin: 20px auto;
                    width: calc(100% - 40px);
                    max-width: 600px;
                    border-radius: 20px;
                    padding: 25px;
                    position: relative;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    margin-bottom: 40px;
                ">
                    <span onclick="closePasswordModal()" style="
                        position: absolute;
                        left: 15px;
                        top: 10px;
                        font-size: 28px;
                        font-weight: bold;
                        cursor: pointer;
                        color: #aaa;
                        line-height: 1;
                    ">&times;</span>
                    
                    <h2 style="
                        font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                        font-weight: 700;
                        font-size: 21.99px;
                        line-height: 150%;
                        letter-spacing: 0%;
                        text-align: center;
                        color: #00a19a;
                        margin: 0 0 20px 0;
                        padding: 0 30px 0 0;
                    ">تعديل كلمة المرور</h2>
                    
                    <form onsubmit="handlePasswordSubmit(event)" style="
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    ">
                        <!-- كلمة المرور الحالية -->
                        <div style="padding: 0; margin: 0 0 10px 0;">
                            <input type="password" id="currentPassword" placeholder="كلمة المرور الحالية" style="
                                width: 100%;
                                height: 50px;
                                border-radius: 10px;
                                border: 1px solid #e0e0e0;
                                padding: 0 15px;
                                text-align: right;
                                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                font-size: 16px;
                                box-sizing: border-box;
                                background-color: #f8f9fa;
                                margin: 0;
                            " required>
                        </div>
                        
                        <!-- كلمة المرور الجديدة -->
                        <div style="padding: 0; margin: 0 0 10px 0;">
                            <input type="password" id="newPassword" placeholder="كلمة المرور الجديدة" style="
                                width: 100%;
                                height: 50px;
                                border-radius: 10px;
                                border: 1px solid #e0e0e0;
                                padding: 0 15px;
                                text-align: right;
                                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                font-size: 16px;
                                box-sizing: border-box;
                                background-color: #f8f9fa;
                                margin: 0;
                            " required>
                        </div>
                        
                        <!-- تأكيد كلمة المرور الجديدة -->
                        <div style="padding: 0; margin: 0 0 10px 0;">
                            <input type="password" id="confirmPassword" placeholder="تأكيد كلمة المرور الجديدة" style="
                                width: 100%;
                                height: 50px;
                                border-radius: 10px;
                                border: 1px solid #e0e0e0;
                                padding: 0 15px;
                                text-align: right;
                                font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                                font-size: 16px;
                                box-sizing: border-box;
                                background-color: #f8f9fa;
                                margin: 0;
                            " required>
                        </div>
                        
                        <!-- زر الإرسال -->
                        <button type="submit" id="submitPasswordChange" style="
                            width: 100%;
                            height: 50px;
                            background-color: #00a19a;
                            color: white;
                            border: none;
                            border-radius: 10px;
                            font-family: 'Droid Arabic Kufi', Arial, sans-serif;
                            font-size: 18px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                            margin: 15px 0 0 0;
                        ">أرسل</button>
                    </form>
                </div>
            </div>
        `;
        
        // إضافة النافذة إلى الصفحة
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // الدوال الأساسية للنافذة - محدثة للـ ID الصحيح
    window.showPasswordChangeModal = function() {
        const modal = document.getElementById('password-change-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // تركيز على أول حقل
            setTimeout(() => {
                const firstInput = document.getElementById('currentPassword');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
            
        } else {

        }
    };
    
    window.closePasswordModal = function() {
        const modal = document.getElementById('password-change-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // مسح الحقول
            const currentPassword = document.getElementById('currentPassword');
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            
            if (currentPassword) currentPassword.value = '';
            if (newPassword) newPassword.value = '';
            if (confirmPassword) confirmPassword.value = '';
        }
    };
    
    window.handlePasswordSubmit = function(event) {
        event.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        
        // التحقق من ملء جميع الحقول
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('يرجى ملء جميع الحقول');
            return;
        }
        
        // التحقق من طول كلمة المرور الجديدة
        if (newPassword.length < 6) {
            alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
            return;
        }
        
        // التحقق من تطابق كلمة المرور الجديدة مع التأكيد
        if (newPassword !== confirmPassword) {
            alert('كلمة المرور الجديدة وتأكيدها غير متطابقتين');
            return;
        }
        
        // التحقق من أن كلمة المرور الجديدة مختلفة عن الحالية
        if (currentPassword === newPassword) {
            alert('كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية');
            return;
        }
        
        // تأثير بصري أثناء الحفظ
        const submitBtn = document.getElementById('submitPasswordChange');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'جاري الحفظ...';
        submitBtn.style.backgroundColor = '#666';
        submitBtn.disabled = true;
        
        // محاكاة عملية الحفظ
        setTimeout(() => {
            alert('تم تعديل كلمة المرور بنجاح!');
            closePasswordModal();
            
            // إعادة تعيين الزر
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '#00a19a';
            submitBtn.disabled = false;
        }, 1500);
    };
    
    // ربط أزرار كلمة المرور - محدث لفتح نافذة استرداد كلمة المرور
    function setupPasswordButtons() {
        const allElements = document.querySelectorAll('a, button, .btn, .dashboard-btn, .menu-item, [onclick], .profile-password-btn');
        
        allElements.forEach(element => {
            const text = element.textContent || element.innerText || '';
            const href = element.getAttribute('href') || '';
            const onclick = element.getAttribute('onclick') || '';
            const className = element.className || '';
            
            if ((text.includes('كلمة المرور') || 
                text.includes('تعديل كلمة') ||
                text.includes('تغيير كلمة') ||
                href.includes('password') ||
                onclick.includes('password') ||
                className.includes('profile-password-btn')) && 
                !element.hasAttribute('data-password-fixed')) {
                
                
                // إزالة الأحداث القديمة
                element.removeAttribute('href');
                element.removeAttribute('onclick');
                element.style.cursor = 'pointer';
                
                // إنشاء نسخة جديدة
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                
                // إضافة حدث جديد - سيفتح نافذة استرداد كلمة المرور
                newElement.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    
                    // إخفاء جميع النوافذ الأخرى
                    const modals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"]');
                    modals.forEach(modal => {
                        if (modal.style && 
                            modal.id !== 'forgot-password-modal' && 
                            !modal.classList.contains('forgot-password-modal')) {
                            modal.style.display = 'none';
                        }
                    });
                    
                    // فتح نافذة استرداد كلمة المرور بدلاً من التعديل
                    showForgotPasswordModal();
                });
                
                newElement.setAttribute('data-password-fixed', 'true');
            }
        });
    }
    
    // إغلاق النافذة عند النقر خارجها أو بزر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const forgotModal = document.getElementById('forgot-password-modal');
            if (forgotModal && forgotModal.style.display === 'flex') {
                closeForgotPasswordModal();
            }
            
            const changeModal = document.getElementById('password-change-modal');
            if (changeModal && changeModal.style.display === 'block') {
                closePasswordModal();
            }
        }
    });
    
    // تشغيل الإصلاح
    setTimeout(() => {
        cleanDuplicateModals();
        createCleanModal();
        setupForgotPasswordModal();
        
        // ربط الأزرار بعد فترة قصيرة
        setTimeout(() => {
            setupPasswordButtons();
            
            // بحث خاص للزر المحدد
            const specificBtn = document.querySelector('.profile-password-btn');
            if (specificBtn && !specificBtn.hasAttribute('data-password-fixed')) {
                
                specificBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showForgotPasswordModal();
                });
                
                specificBtn.setAttribute('data-password-fixed', 'true');
            }
        }, 200);
    }, 100);
    
    // إعادة الربط عند فتح الملف الشخصي
    document.addEventListener('click', function(e) {
        const target = e.target;
        const text = target.textContent || '';
        
        if (text.includes('الملف الشخصي') || 
            text.includes('profile') || 
            text.includes('تسجيل الدخول')) {
            setTimeout(() => {
                setupPasswordButtons();
                setupForgotPasswordModal();
            }, 300);
        }
    });
    
    // إضافة وظائف عامة
    window.showForgotPasswordModal = showForgotPasswordModal;
    window.closeForgotPasswordModal = closeForgotPasswordModal;
    
});
