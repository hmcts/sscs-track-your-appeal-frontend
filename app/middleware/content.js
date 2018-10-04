const { renderContent } = require('app/core/tyaNunjucks');

const aboutHearingContent = (req, res, next) => {
  const appeal = res.locals.appeal;
  const benefitType = { benefitType: appeal.benefitType };
  res.locals.i18n.hearing = renderContent(res.locals.i18n.hearing, benefitType);

  next();
};

const emailNotifications = (req, res, next) => {
  const token = res.locals.token;
  const placeholder = { benefitType: token.benefitType };
  const notificationsContent = res.locals.i18n.notifications;
  res.locals.i18n.notifications = renderContent(notificationsContent, placeholder);

  next();
};

const evidenceContent = (req, res, next) => {
  const appeal = res.locals.appeal;
  const caseReference = appeal.caseReference;
  const benefitType = { benefitType: appeal.benefitType, caseReference };
  res.locals.i18n.evidence =
    renderContent(res.locals.i18n.evidence, benefitType);
  next();
};

module.exports = { aboutHearingContent, emailNotifications, evidenceContent };
