// Complete Website Lock & Interaction Blocker
(function enforceWebsitePaymentLock() {
    // 1. Lock scrolling on document and body
    function lockScroll() {
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');
        document.body.style.setProperty('overflow', 'hidden', 'important');
        document.documentElement.style.setProperty('height', '100vh', 'important');
        document.body.style.setProperty('height', '100vh', 'important');
    }
    lockScroll();
    window.addEventListener('DOMContentLoaded', lockScroll);
    window.addEventListener('load', lockScroll);

    // 2. Keep scroll fixed at top
    window.addEventListener('scroll', function() {
        if (window.scrollX !== 0 || window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }
    }, { passive: false });

    // 3. Block mousewheel and touch scroll
    function handleTouchWheel(e) {
        const cardContainer = e.target.closest('.blocking-container');
        if (cardContainer && cardContainer.scrollHeight > cardContainer.clientHeight) {
            return true; // allow internal scroll on very small landscape screens
        }
        e.preventDefault();
        return false;
    }
    window.addEventListener('wheel', handleTouchWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchWheel, { passive: false });

    // 4. Prevent keyboard scrolling/navigation keys
    window.addEventListener('keydown', function(e) {
        if (e.target && e.target.closest('.blocking-lang-switcher')) {
            return;
        }
        const blockedKeys = [' ', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
        if (blockedKeys.includes(e.key)) {
            e.preventDefault();
        }
    });

    // 5. Intercept all clicks outside the language switcher
    document.addEventListener('click', function(e) {
        if (e.target.closest('.blocking-lang-switcher')) {
            return true; // allow language toggle
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
})();
