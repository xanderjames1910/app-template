import React from 'react';
import moment from 'moment';
import 'moment/locale/es-us';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const Notifications = props => {
  const { notifications } = props;
  return (
    <div>
      <Card style={{ marginBottom: 20 }} className='shadow-sm'>
        <Card.Header as='h5' className='text-center'>
          Notificaciones
        </Card.Header>
        <Card.Body style={{ padding: '1.25rem 1.25rem 0.75rem 1.25rem' }}>
          {notifications &&
            notifications.map(item => {
              return (
                <Alert variant='info' className='mb-2' key={item.id}>
                  <strong>{item.user}</strong> {item.content} {moment(item.time.toDate()).fromNow()}
                </Alert>
              );
            })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Notifications;
