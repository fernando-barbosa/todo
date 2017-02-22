'use strict';

angular
	.module('app.core')
	.controller('loginForgetController', function($scope) {
	
		const applicationServerPublicKey = 'BBEkSQtbmoxRO1S0hQ7cu85mSCwH1kHSd9IXQodGabIAiWr567qrvaMXBm6vAQ_0_mXkwzjQJAnJsaWqRwgzGlE';
		const pushButton = document.querySelector('.js-push-btn');

		let isSubscribed = false;
		let swRegistration = null;

		function urlB64ToUint8Array(base64String) {
		  const padding = '='.repeat((4 - base64String.length % 4) % 4);
		  const base64 = (base64String + padding)
		    .replace(/\-/g, '+')
		    .replace(/_/g, '/');

		  const rawData = window.atob(base64);
		  const outputArray = new Uint8Array(rawData.length);

		  for (let i = 0; i < rawData.length; ++i) {
		    outputArray[i] = rawData.charCodeAt(i);
		  }
		  return outputArray;
		}

		function updateBtn() {
		  if (Notification.permission === 'denied') {
		    pushButton.textContent = 'Push Messaging Blocked.';
		    pushButton.disabled = true;
		    updateSubscriptionOnServer(null);
		    return;
		  }

		  if (isSubscribed) {
		    pushButton.textContent = 'Disable Push Messaging';
		  } else {
		    pushButton.textContent = 'Enable Push Messaging';
		  }

		  pushButton.disabled = false;
		}

		function updateSubscriptionOnServer(subscription) {
		  // TODO: Send subscription to application server

		  const subscriptionJson = document.querySelector('.js-subscription-json');
		  const subscriptionDetails = document.querySelector('.js-subscription-details');

		  if (subscription) {
		    subscriptionJson.textContent = JSON.stringify(subscription);
		    subscriptionDetails.classList.remove('is-invisible');
		  } else {
		    subscriptionDetails.classList.add('is-invisible');
		  }
		}

		function subscribeUser() {
		  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
		  swRegistration.pushManager.subscribe({
		    userVisibleOnly: true,
		    applicationServerKey: applicationServerKey
		  })
		  .then(function(subscription) {
		    console.log('User is subscribed.');

		    updateSubscriptionOnServer(subscription);

		    isSubscribed = true;

		    updateBtn();
		  })
		  .catch(function(err) {
		    console.log('Failed to subscribe the user: ', err);
		    updateBtn();
		  });
		}

		function initialiseUI() {
		  pushButton.addEventListener('click', function() {
		    pushButton.disabled = true;
		    if (isSubscribed) {
		      // TODO: Unsubscribe user
		    } else {
		      subscribeUser();
		    }
		  });

		  // Set the initial subscription value
		  swRegistration.pushManager.getSubscription()
		  .then(function(subscription) {
		    isSubscribed = !(subscription === null);

		    updateSubscriptionOnServer(subscription);

		    if (isSubscribed) {
		      console.log('User IS subscribed.');
		    } else {
		      console.log('User is NOT subscribed.');
		    }

		    updateBtn();
		  });
		}
	});