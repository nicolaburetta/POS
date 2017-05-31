$(document).ready(function () {

  function restore(e) {
    if (!$('#modal-submit').hasClass('disabled')) {
      $('#modal-submit').addClass('disabled');
    }
  }

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

});
