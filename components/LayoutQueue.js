import React, {useState} from 'react'
import { Card } from 'react-bootstrap';
import styles from '../styles/Layout.module.scss'
import messages from '../imports/translation.json';

const LayoutQueue = props => {

  const [ locale, setLocale ] = useState('en');
  
  const LanguageLabelSelects = function(id){
    return messages[locale][id];
  }

  return (
    <div className={styles.containerPublicSchedule}>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style = {{
              width : '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
              <h1>NOMBRE</h1>
              <p>
                Full información
              </p>
            </div>
            { true && ( //general && general.imageURL
              <div style = {{
                width : '150px',
                height : '150px',
                //backgroundImage: `url(${general.urlImage})`,
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: "no-repeat",
              }} />
            )}
          </div>
          
          {true && ( //queueStage
            <h3 className="mb-0 text-center font-weight-bold">
              {/* {queue? queue.name : ''}
              {queue.location && (
                <>
                  <br />
                  <small>{queue.location}</small>
                </>
              )} */}
            </h3>
          )}

          {false && ( //(!queueStage && (contactId!= null || queueContactId!= null))
            <h3 className="mb-0 text-center font-weight-bold">
              {/* {nameSecondDoseEvent}
              {locationSecondDoseEvent && (
                <>
                  <br />
                  <small>{locationSecondDoseEvent}</small>
                </>
              )} */}
            </h3>
          )}

        </Card.Header>
        
        {props.children}

        <Card.Footer>
          <p>
          <a href="/terms-and-conditions" target="_blank">{LanguageLabelSelects("privacyPolicy")}</a>
          </p>
        </Card.Footer>
      </Card>
    </div>
  )
};

export default LayoutQueue;