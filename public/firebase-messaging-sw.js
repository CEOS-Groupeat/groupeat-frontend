importScripts(
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyDpJG4P86j2JIjzkSfRbz1KtmyRTn2y_Hs',
  authDomain: 'groupeat-9f762.firebaseapp.com',
  projectId: 'groupeat-9f762',
  storageBucket: 'groupeat-9f762.firebasestorage.app',
  messagingSenderId: '721896541576',
  appId: '1:721896541576:web:b51994af2a26503ac97e3d',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification?.title ?? '알림';
  const notificationOptions = {
    body: payload.notification?.body ?? '',
    icon: '/icons/icon_notice.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
