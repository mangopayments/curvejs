;(function($){

  $.fn.curve = function( options, fn ) {

    var settings = $.extend({
      target: 'body',
      trigger: 'click',
      startLength: .1,
      startAngle: 0,
      endLength: 1,
      endAngle: -30,
      duration: 1000,
      parent: '.holder',
      thumb: '.thumb',
      addedDuration: 1000
    }, options);

    this.each(function(){

      var $thumb = $(settings.parent).find(settings.thumb);
      var $target = $(settings.target);

      $(this).on(settings.trigger, function(e){

        if(settings.trigger === "click")
          e.preventDefault();    

        var from = $thumb.offset();
        var to = $target.offset();

        var $clone = $thumb.clone().addClass('moving');
        $('body').append($clone);

        $clone.css({
          position: 'absolute',
          left: from.left,
          top: from.top
        });

        var start = {x: from.left, y: from.top, angle: settings.startAngle, length: settings.startLength};
        var end = {x: to.left, y: to.top, angle: settings.endAngle, length: settings.endLength};

        $clone.animate({path: new $.path.bezier({start: start, end: end })}, settings.duration, function(){
          $clone.remove();
          fn && fn.call(this);
          $target.addClass('added')
          setTimeout(function(){
            $target.removeClass('added');
          }, settings.addedDuration);
        });

      });
    
    });

  };

})(jQuery);
