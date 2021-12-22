import React, { useState } from 'react'
import { Row, Col, Card, Button, Form, OverlayTrigger } from 'react-bootstrap'
import LayoutQueue from '../../components/LayoutQueue'
import RenderTooltip from '../../components/RenderTooltip'
import styles from '../../styles/Layout.module.scss'
import messages from '../../imports/translation.json';

const DEFAULT_STATE =  {
    waitlist: {
          required: [],
          hidden: []
    },
      queue: {
          required: [],
          hidden: []
    },
      contact: {
          required: [],
          hidden: []
    },
  };
  
  const STAGES = {
    REGISTER_CONTACTS: 'REGISTER_CONTACTS',
    CHOOSE_SCHEDULE: 'CHOOSE_SCHEDULE',
    CHOOSE_SCHEDULE_SECONDDOSE: 'CHOOSE_SCHEDULE_SECONDDOSE',
    DONE: 'DONE',
  };
  
  const QUEUE_ITEMS_STATUS = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    OUT: 'OUT',
    NO_AVAILABLE: 'NO_AVAILABLE',
  };
  
const Queue = (props) => {
    const { queueId, queueCode, requireSecondDoseValue, mode, contact, contactId, updateTitle, readOnlyPersonalData = false, waitlistContactId = null, languageChangeGeneral} = props;
    const [ items, setItems ] = useState([]);
    const [ savedContacts, setSavedContacts ] = useState([]);
    const [ currentStage, setCurrentStage ] = useState(true ? STAGES.CHOOSE_SCHEDULE : STAGES.REGISTER_CONTACTS);
    const [ acceptConcent, setAcceptConcent ] = useState(false);
    let isQueueFull = true;
    const [ locale, setLocale ] = useState('en');

    const LanguageLabelSelects = function(id){
        return messages[locale][id];
    }

    if (false){//if (isQueueFull || currentStage == STAGES.NO_AVAILABLE || (isOnlyWaitlist && !contact)) {
        return (
            <LayoutQueue>
                <Card.Body className={styles.cardHeader}>
                    <center>
                    <h2 className="title-cursive title-sorry">Sorry</h2>
                    <h3>No appointments available</h3>
                    <a className="btn btn-primary mt-3 m-0" role="button">
                        Add me to waitlist
                    </a>
                    </center>
                </Card.Body>
            </LayoutQueue>
        );
    }

    return (
        <LayoutQueue>
            <Card.Body className={styles.cardHeader}>
                <div>
                {
                    items.map((item, index) => {
                        const key = `index${index}`;
                        return (
                            <h3>Aqui va New Schedule Contact</h3>
                        )
                    })
                }
                </div>
            
                {true && ( //!readOnlyPersonalData
                    <div className="mt-3">
                    <Button block className="btn-info-tracker">
                        {LanguageLabelSelects("addContact")}
                    </Button>
                    </div>
                )}
                <Col md={{ span: 4, offset: 8 }}>
                    <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={RenderTooltip}
                    >
                    <div style= {{borderRadius:4, backgroundColor: '#fff2a8', padding: '8px', textAlign: "center"}}>
                        <Form.Check
                        style = {{"margin" : "0px"}}
                        type="checkbox"
                        name="consent"
                        inline
                        checked={acceptConcent}
                        //onChange={e => setAcceptConcent(!acceptConcent)}
                        />
                        {LanguageLabelSelects("consentTo")} <a href="/electronic-consent" target="_blank" paddingLeft="-20px">
                        Electronic Communications
                        </a>
                    </div>
                    </OverlayTrigger>
                    { true && ( //(!acceptConcent && notValingData)
                    //alert("Label you need to Accept the Consent"),
                    <p className="text-danger mt-2">{LanguageLabelSelects("acceptConsent")}</p>
                    )}
                </Col>
                <div className="mt-3 text-right">
                    <Button className="btn-info-tracker">
                        {LanguageLabelSelects("scheduleAppointment")}
                    </Button>
                </div>
            </Card.Body>
        </LayoutQueue>
    )
}

export default Queue;