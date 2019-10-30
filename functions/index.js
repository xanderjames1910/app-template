const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const request = require('request');

const createNotification = notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('Notificación añadida', doc));
};

exports.projectCreated = functions.firestore.document('projects/{projectId}').onCreate(doc => {
  const project = doc.data();
  const notificaction = {
    content: 'añadió un nuevo projecto',
    user: `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notificaction);
});

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notificaction = {
        content: 'se ha unido',
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return createNotification(notificaction);
    });
});

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check request is made byand admin
  if (context.auth.token.admin !== true) {
    return { error: 'Solo administradores pueden añadir administradores' };
  }

  // Get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `${data.email} se ha convertido en Administrador`,
      };
    })
    .catch(err => {
      return err;
    });
});

exports.subscriberToMailChimpList = functions.firestore.document('subscribers/{subscriberId}').onCreate(doc => {
  const subscriber = doc.data();

  const data = {
    members: [
      {
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName,
          LNAME: subscriber.lastName,
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  const options = {
    uri: encodeURI('https://us20.api.mailchimp.com/3.0/lists/8fad05bf0f'),
    // url: 'https://us20.api.mailchimp.com/3.0/lists/8fad05bf0f',
    method: 'POST',
    headers: {
      Authorization: 'auth f94484fe412d5b5bb90040b2a0374c99-us20',
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      if (response.statusCode === 200) {
        console.log('Success');
      } else {
        console.log('err');
      }
    }
  });
});
