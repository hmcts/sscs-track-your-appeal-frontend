function ViewHideUpdates() {
  let self = this;

  self.toggleUpdates = function () {
    let $summary = $('.track-your-appeal .events details summary ');
    $summary.on('click', function () {
      let $span = $(this).find('span');
      $span.text() === 'View previous updates' ?
        $span.text('Hide previous updates') :
        $span.text('View previous updates');
    })
  }
}

$(document).ready(function () {
  let viewHideUpdates = new ViewHideUpdates();
  viewHideUpdates.toggleUpdates();
});
