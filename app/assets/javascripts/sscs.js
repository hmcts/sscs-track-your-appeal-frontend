
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

  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a
  // button, with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init();

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  // to toggle hidden content
  const showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();

  // Toggle the historic events label on TYA.
  let viewHideUpdates = new ViewHideUpdates();
  viewHideUpdates.toggleUpdates();
});
