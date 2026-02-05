$(document).ready(function(){
      
  // ===========================
  // 1. 변수 선언
  // ===========================
  const $header = $('#mainHeader');               // [중요] 헤더 잡기
  const $topArea = $('#topVisualContainer');      
  const $mainGrid = $('#mainListGrid');           
  const $midHeader = $('#recentWorksHeader');     
  const $allArticles = $('.project_item');        
  const $bgContent = $('.container');           

  // [초기 실행]
  setBadges(); 
  activateTab('main_visual');

  // ===========================
  // 2. 탭(Tab) 기능
  // ===========================
  $('.tab_menu li a').click(function(e){
    e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    activateTab(filterValue);
  });

  function activateTab(filterName) {
    $('.tab_menu li a').removeClass('on');
    $('.tab_menu li a[data-filter="' + filterName + '"]').addClass('on');
    $allArticles.hide(); 

    if (filterName === 'main_visual') {
      $topArea.show(); $midHeader.show(); $('.badge').show(); 
      $('.main_top_item').appendTo($topArea).show();
      $('.main_list_item').appendTo($mainGrid).show();
    } else {
      $topArea.hide(); $midHeader.hide(); $('.badge').hide(); 
      $allArticles.appendTo($mainGrid);
      if (filterName === 'all') $allArticles.show();
      else $allArticles.filter('.' + filterName).show();
    }
  }

  // ===========================
  // 3. 배지(Badge) 생성
  // ===========================
  function setBadges() {
    $allArticles.each(function() {
      var category = $(this).data('category'); 
      var $thumbBox = $(this).find('.thumb_box');
      if ($thumbBox.find('.badge').length === 0) {
        $thumbBox.append('<span class="badge"></span>');
      }
      if (category) $thumbBox.find('.badge').text(category);
    });
  }

  // ===========================
  // 4. 팝업(Modal) 기능 [여기가 핵심 수정됨]
  // ===========================
  var currentIndex = 0;
  var $visibleItems = []; 

  $(document).on('click', '.project_item', function(){
    $visibleItems = $('.project_item:visible');
    currentIndex = $visibleItems.index(this); 
    openModal(this);
  });

  function openModal(el) {
    // 데이터 채우기
    var title = $(el).data('title');
    var tools = $(el).data('tools'); 
    var category = $(el).data('category');
    var fullImg = $(el).data('full-image') || $(el).find('img').attr('src');

     $('#modalPopup').toggleClass('is-detail', String(category).toLowerCase().includes('detail'));

    $('#mCategoryTitle').text(category); 
    $('#mTools').text(tools);
    $('#mProject').text(title);
    $('#mCategory').text(category + ' Design'); 
    $('#mImage').attr('src', fullImg);
    

    // 1. 팝업 띄우기
    $('#modalPopup').stop().fadeIn(300).css('display', 'flex');
    $('#modalPopup').addClass('is-open');
    
    // 2. 배경 블러 처리
    $bgContent.addClass('is-hidden'); 
    $('body').css('overflow', 'hidden'); 

    // ✅ [강제 해결] 헤더를 아예 없애버림 (CSS 충돌 원천 차단)
    $header.hide(); 
  }

  // 닫기 기능
  $('#modalClose, .modal_overlay').click(function(){
    $('#modalPopup').stop().fadeOut(300, function(){
     $('#modalPopup').removeClass('is-open');
          //  이미지 메모리 해제
    $('#mImage').attr('src', '');
       
       // 팝업이 완전히 꺼진 후 실행
       $('body').css('overflow', 'auto');     
       $bgContent.removeClass('is-hidden');   
       
       // ✅ [복구] 헤더 다시 나타나게 함
       $header.show(); 
    });
  });

  // 버튼 이벤트
  $('#btnPrev').click(function(e){ e.stopPropagation(); currentIndex--; if(currentIndex < 0) currentIndex = $visibleItems.length - 1; updateModalContent(); });
  $('#btnNext').click(function(e){ e.stopPropagation(); currentIndex++; if(currentIndex >= $visibleItems.length) currentIndex = 0; updateModalContent(); });
  $('.modal_container').click(function(e){ e.stopPropagation(); });

 function updateModalContent() {
  $('#mImage').attr('src', '');

  // 다음/이전 아이템 가져오기
  var nextItem = $visibleItems.eq(currentIndex);

  // 새 이미지 열기
  openModal(nextItem);
}
});