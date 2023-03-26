
const webpush = require("web-push")

module.exports.subscription = (req, res, next ) => {
    const subscription = req.body;

  res.status(201).json({ });

  const payload = JSON.stringify({
    title: 'Your meal expired!',
    body: 'hurry!',
  });

  webpush.sendNotification(subscription, payload)
    .catch(error => console.error(error));

    next()
}