function ShowHideUpdates() {
  let self = this;

  self.toggleUpdates = function () {
    let $updatesContainer = $('.updates-container');
    let $i = $('.updates-toggle i');
    $i.on('click', function () {
      let $this = $(this);
      if ($this.hasClass('fa-caret-right')) {
        $this.removeClass('fa-caret-right');
        $this.addClass('fa-caret-down');
        $this.find('span').text('Hide previous updates');
        $updatesContainer.css('display', 'block');
      } else {
        $this.removeClass('fa-caret-down');
        $this.addClass('fa-caret-right');
        $this.find('span').text('View previous updates');
        $updatesContainer.css('display', 'none');
      }
    })
  }
}

$(document).ready(function () {
  let showHideUpdates = new ShowHideUpdates();
  showHideUpdates.toggleUpdates();
});
