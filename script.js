document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Premium Preloader & Entrance Animation
  const preloader = document.querySelector('.preloader');
  
  setTimeout(() => {
    preloader.classList.add('hidden');
    
    // Add entrance class to all init-hidden elements
    document.querySelectorAll('.init-hidden').forEach((el) => {
      // we add slideUpReveal class which handles blur/transform based on delay set in CSS
      el.classList.add('slideUpReveal');
    });
    
  }, 2200);

  // 2. Spotlight ambient lighting effect following cursor
  const spotlight = document.querySelector('.spotlight');
  if (spotlight && window.matchMedia("(pointer: fine)").matches) {
    document.body.addEventListener('mousemove', (e) => {
      spotlight.style.opacity = 1;
      const x = e.clientX;
      const y = e.clientY;
      // center spotlight over cursor
      spotlight.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    });
    document.body.addEventListener('mouseleave', () => {
      spotlight.style.opacity = 0;
    });
  }

  // 3. High-Performance Intersection Observer (Scroll Reveal including Blurs)
  const observerOptions = { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll, .draw-line").forEach(el => observer.observe(el));

  // 4. Magnetic Hover Effect for Buttons (Super Premium feel)
  const magneticItems = document.querySelectorAll('.magnetic-btn');
  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const position = item.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      // Move the button container smoothly
      item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      // Parallax the icon inside to make it feel 3D
      item.children[1].style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
    });
    
    item.addEventListener('mouseleave', () => {
      // Snap back to original
      item.style.transform = 'translate(0px, 0px)';
      item.children[1].style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // 5. Parallax Background & Floating Typography Elements
  const pGroup1 = document.querySelector(".parallax-group-1");
  const pGroup2 = document.querySelector(".parallax-group-2");
  const pGroup3 = document.querySelector(".parallax-group-3");
  
  let ticking = false;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Offset parallax for huge floating words making them feel like they float
        if(pGroup1) pGroup1.style.transform = `translateY(${scrollY * -0.03}px)`;
        if(pGroup2) pGroup2.style.transform = `translateY(${scrollY * -0.06}px)`;
        if(pGroup3) pGroup3.style.transform = `translateY(${scrollY * -0.04}px)`;

        ticking = false;
      });
      ticking = true;
    }
  });

  // 6. Custom Trailing Physics Cursor
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
      
      cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });

    const animateCursor = () => {
      let distX = mouseX - outlineX;
      let distY = mouseY - outlineY;
      
      outlineX += distX * 0.2;
      outlineY += distY * 0.2;

      cursorOutline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .logo-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '70px';
        cursorOutline.style.height = '70px';
        cursorOutline.style.background = 'rgba(106, 81, 42, 0.05)';
        cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(2)`;
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.background = 'transparent';
        cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(1)`;
      });
    });
  }

  // 7. Coming Soon Toast Notification
  const websiteBtns = document.querySelectorAll('.websiteBtn');
  const toast = document.getElementById('toast');
  
  if (websiteBtns.length > 0 && toast) {
    let toastTimeout;
    websiteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Trigger modern click animation
        btn.classList.remove('clicked');
        void btn.offsetWidth; // Force reflow to restart animation reliably
        btn.classList.add('clicked');
        
        clearTimeout(toastTimeout);
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
          btn.classList.remove('clicked'); // Reset button state
        }, 3000);
      });
    });
  }
});
