const {renderContent} = require('app/core/tyaNunjucks');

const aboutHearingContent = (req, res, next) => {
  const appeal = res.locals.appeal;
  const placeholder = { benefitType: appeal.benefitType };
  res.locals.i18n.hearing = renderContent(res.locals.i18n.hearing, placeholder);

  next();
};

const emailNotifications = (req, res, next) => {
  const token = res.locals.token;
  const placeholder = { benefitType: token.benefitType };
  res.locals.i18n.notifications = renderContent(res.locals.i18n.notifications, placeholder);

  next();
};

module.exports = { aboutHearingContent, emailNotifications };
