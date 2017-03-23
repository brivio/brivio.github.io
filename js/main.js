if (typeof window.history.pushState == 'undefined') {
    var img = '<img src="/images/chrome.jpeg">';
    document.body.innerHTML = '<div id="browser_warning">' + img + '<h3>请用最新版Chrome打开!</h3></div>';
}
$('.body_container').show();
//返回顶部
(function () {
    $(window).scroll(function () {
        $(window).scrollTop() > 100 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
    });
    $("#rocket").click(function () {
        $("#rocket").addClass("launch");
        $("html, body").animate({
            scrollTop: 0
        }, 500, function () {
            $("#rocket").removeClass("show launch");
        });
        return false;
    });

})();
//右侧菜单
(function () {
    if ($('#toc').size() == 0)return;

    $('#toc').css({
        'overflow-y': 'scroll'
    });

    var tocItems = [];
    $('.post-content').children('h1,h2,h3,h4,h5,h6').each(function () {
        tocItems.push($(this));
    });

    function setupSidebarStyle() {
        var topOffset = $('#header').height() + 20;
        if ($(window).scrollTop() > topOffset) {
            $('#toc').css({
                position: 'fixed',
                top: '20px',
                right: '0px',
                width: $('#toc').parents('#sidebar').width() + 'px',
                "max-height": (document.body.clientHeight - 36) + 'px'
            });
        } else {
            $('#toc').css({
                position: 'static',
                "max-height": (document.body.clientHeight - 36 - topOffset) + 'px'
            });
        }
        //高亮
        var currentIndex = 0;
        for (var i = 0; i < tocItems.length; i++) {
            if ($(window).scrollTop() > tocItems[i].position().top) {
                currentIndex = i;
            } else {
                break;
            }
        }
        $('.toc-link').removeAttr('style').eq(currentIndex).css({color: '#ea4335'});
    }

    setupSidebarStyle();
    $(window).scroll(function () {
        setupSidebarStyle();
    });
    $(window).resize(function () {
        setupSidebarStyle();
    });
})();

$(window).load(function () {
    $('pre').addClass('prettyprint linenums').attr('style', 'overflow:hidden;');
    prettyPrint();
});