$(document).ready(function () {
/*
  var add = [];
  var remove = [];

  $( '.dropdown-menu.add-menu a' ).on('click', function( event ) {

     var $target = $( event.currentTarget ),
         val = $target.attr( 'data-value' ),
         $inp = $target.find( 'input' ),
         idx;

     if ( ( idx = add.indexOf( parseInt(val, 10) ) ) > -1 ) {
        add.splice( idx, 1 );
        setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
     } else {
        add.push( parseInt(val, 10) );
        setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
     }

     $( event.target ).blur();

     console.log( add );
     return false;
  });

  $( '.dropdown-menu.remove-menu a' ).on( 'click', function( event ) {

     var $target = $( event.currentTarget ),
         val = $target.attr( 'data-value' ),
         $inp = $target.find( 'input' ),
         idx;

     if ( ( idx = remove.indexOf( parseInt(val, 10) ) ) > -1 ) {
        remove.splice( idx, 1 );
        setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
     } else {
        remove.push( parseInt(val, 10) );
        setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
     }

     $( event.target ).blur();

     console.log( remove );
     return false;
  });

  function restore(e) {
    if (!$('#modal-submit').hasClass('disabled')) {
      $('#modal-submit').addClass('disabled');
    }
  }
*/

  $('.add-modal-button').on('click', function (event) {
    $(this).parent().toggleClass('open');
  });

  $('.remove-modal-button').on('click', function (event) {
    $(this).parent().toggleClass('open');
  });

  $('body').on('click', function (e) {
    if ( ( !$('.add-modal-button').is(e.target)
        && $('.add-modal-button').has(e.target).length === 0
        && $('.open').has(e.target).length === 0 )
        || $('.remove-modal-button').is(e.target)
    ) {
        $('.button-group.add-button-group').removeClass('open');
    }

    if ( ( !$('.remove-modal-button').is(e.target)
        && $('.remove-modal-button').has(e.target).length === 0
        && $('.open').has(e.target).length === 0 )
        || $('.add-modal-button').is(e.target)
    ) {
        $('.button-group.remove-button-group').removeClass('open');
    }
  });

  $('#confirm-order-button').on('click', function (e) {
    if (!$('#panel-collapse1').hasClass('collapsed')) $('#panel-collapse1').trigger('click');
    if (!$('#panel-collapse2').hasClass('collapsed')) $('#panel-collapse2').trigger('click');
    if (!$('#panel-collapse3').hasClass('collapsed')) $('#panel-collapse3').trigger('click');
    if (!$('#panel-collapse4').hasClass('collapsed')) $('#panel-collapse4').trigger('click');
  });
/*
    $('#myselect').change(function(e) {

      if ($('#myselect').val() != 'NaN' && $('#modify-button').val() > 0 )
      {  $('#modal-submit').removeClass('disabled'); }
      else {
        restore(e);
      }

        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        //e.preventDefault();
    });

    $('#modify-button').click(restore);

    $('#delete-button').click(function(e){
      $('#inlineFormInputMySelect').val('Riga...');
    });
    */

});
