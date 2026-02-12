// header scroll시 background view
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainHeader"); // ID 일치시킴
  if (!nav) return;

  const THRESHOLD = 20;

  const onScroll = () => {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };

  // 초기 실행 및 스크롤 이벤트 리스너 등록
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});


// aobut 천천히 view
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".block, .skill-icon");
  if (!targets.length) return;

  targets.forEach((el, i) => el.style.setProperty("--stagger", `${i * 50}ms`));

  const hideTimers = new WeakMap();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      // 들어오면 숨김 예약 취소 후 표시
      if (entry.isIntersecting) {
        const t = hideTimers.get(el);
        if (t) {
          clearTimeout(t);
          hideTimers.delete(el);
        }
        el.classList.add("is-visible");
        return;
      }

      // 나가면 숨김(덜 덜컥거림)
      if (!hideTimers.get(el)) {
        hideTimers.set(el, setTimeout(() => {
          el.classList.remove("is-visible");
          hideTimers.delete(el);
        }, 70));
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  targets.forEach((el) => io.observe(el));
});

// web 탭
$(document).ready(function() {
      $('.tab_menu li a').on('click', function() {
        // 탭 활성화 변경
        $('.tab_menu li a').removeClass('on');
        $(this).addClass('on');

        const filterValue = $(this).attr('data-filter');

        if (filterValue === 'all') {
          // 전체 보기
          $('.project_item').stop().hide().fadeIn(400);
        } else {
          // 필터링된 항목만 보기
          $('.project_item').stop().hide();
          $('.' + filterValue).stop().fadeIn(400);
        }
      });
    });


 
    
