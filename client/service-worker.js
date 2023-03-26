self.addEventListener('push', function(event) {
    console.log('Push notification received');
    const data = event.data.json();
    const { title, body } = data;
    const options = {
      body: body,
    };
    event.waitUntil(self.registration.showNotification(title, options));
  });