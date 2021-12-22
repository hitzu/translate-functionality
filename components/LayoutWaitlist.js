import React, {useState} from 'react'
import { Card } from 'react-bootstrap';
import styles from '../styles/Layout.module.scss'
import messages from '../imports/translation.json';

const LayoutWaitlist = props => {

  const [ locale, setLocale ] = useState('es');
  
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
          <hr></hr>
          <h3 className="mb-0 text-center font-weight-bold">
            Current waitlist Name
            {/* {currectWaitlist? currectWaitlist.name : ''} */}
          </h3>
        </Card.Header>
        
        {false && ( //currectWaitlist && currectWaitlist.wait
          <div>
            <img src={'https://igoandsee.s3-us-west-1.amazonaws.com/health/laredo.jpeg'}/>
            {/* {currectWaitlist.wait || 'https://igoandsee.s3-us-west-1.amazonaws.com/health/laredo.jpeg'} */}
          </div>
        )}

        {true && ( //currectWaitlist && !currectWaitlist.wait
          // <ScheduleWaitlistContainer
          //   waitlistCode={waitlistCode}
          //   mode='PUBLIC'
          //   languageChangeGeneral={languageChange}
          // />
          
          props.children
        )}

        <Card.Footer>
          <p>
          <a href="/terms-and-conditions" target="_blank">{LanguageLabelSelects("privacyPolicy")}</a>
          </p>
        </Card.Footer>
      </Card>
    </div>
  )
};

export default LayoutWaitlist;