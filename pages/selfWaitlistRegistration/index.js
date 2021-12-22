import React, { useState } from 'react'
import { Row, Col, Card, Button, Form, OverlayTrigger } from 'react-bootstrap'
import LayoutWaitlist from '../../components/LayoutWaitlist'
import RenderTooltip from '../../components/RenderTooltip'
import styles from '../../styles/Layout.module.scss'
import messages from '../../imports/translation.json';

const STAGES = {
    REGISTER_CONTACTS: 'REGISTER_CONTACTS',
    DONE: 'DONE',
    SURVEY: 'SURVEY',
    NO_AVAILABLE: 'NO_AVAILABLE',
    EMAIL_ALREADY: 'EMAIL_ALREADY'
};

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

const WaitList = (props) => {

    const [ acceptConcent, setAcceptConcent ] = useState(false);
    const [ notValingData, setNotValingData ] = useState(false);
    const [ currectWaitlist, setCurrectWaitlist ] = useState(null);
    const [ showButton, setShowButton ] = useState(true);
    const [ temporalContact, setTemporalContact ] = useState(null);
    const [ currentStage, setCurrentStage ] = useState(STAGES.REGISTER_CONTACTS);
    const [ requiredItems, setRequiredItems ] = useState(DEFAULT_STATE);
    const [ locale, setLocale ] = useState('en');

    const LanguageLabelSelects = function(id){
        return messages[locale][id];
    }

    const clickAddToWaitlist = function() {
        if (currectWaitlist.enableSurvey) {
          addToWaitlistWithForm();
        } else {
          addToWaitlistWithoutForm();
        }
    }

    const addToWaitlistWithForm = function() {
        const submit = document.getElementsByName("data[submit]")[0];
        submit.click();
    }
    
    const addToWaitlistWithoutForm = function() {
        const contactData = contactRef.current.getData();
        if (!validateContacts(contactData)) {
          return;
        }
        addToWaitlist(contactData);
    }

    const AcceptElectronicCommunications = function(props) {
        const { acceptConcent, setAcceptConcent, notValingData } = props;
            return (
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
                            onChange={e => setAcceptConcent(!acceptConcent)}
                            />
                            l{LanguageLabelSelects("consentTo")}<a href="/electronic-consent" target="_blank" paddingLeft="-20px">
                                Electronic Communications
                            </a>
                        </div>      
                    </OverlayTrigger>  
                {(!acceptConcent && notValingData) && (
                <p className="text-danger mt-2">{LanguageLabelSelects("acceptConsent")}</p>,
                alert("label you need to accep the content")
                )}
                </Col> 
        );
    }

    const validateContacts = function(contactData) {
        const address = ['address', 'address2', 'zip', 'state', 'city'];
        let requiredList = [];
    
        try {
            requiredItems.required.forEach((requiredElement) => {
            if (!contactData[requiredElement]) {
                requiredList.push(` ${requiredElement}`);
            }
    
            if (!contactData[requiredElement] && address.includes(requiredElement) && contactData.homeless == "yes") requiredList.pop(requiredElement);
            if (requiredElement == 'phone' && contactData.landline) requiredList.pop(requiredElement);
            if ((requiredElement == 'policyNumber' || requiredElement == 'holderName') && contactData.noInsurance) requiredList.pop(requiredElement);
          });
    
          if (contactData.landline && !contactData.landphone) requiredList.push(' Landline Phone');
          if (!contactData.landline && contactData.phone && !contactData.carrier) requiredList.push(' Phone Carrier');
    
          if (requiredList.length > 0) {
            const currentName = `${contactData.name} ${contactData.lastName}`;
            throw ` ${currentName.toLocaleUpperCase()}: Invalid (${requiredList})`;
          };
    
        } catch (error) {
          alert(error);
          return false;
        }
        return true;
    }

    const goToSurvey = function() {
        const contactData = contactRef.current.getData();
        const valid = validateContacts(contactData);
    
        if (!valid) {
          throw `Missing data in contact`;
          return;
        }
    
        setTemporalContact(contactData);
    
        setCurrentStage(STAGES.SURVEY);
        hideSubmit();
    }

    const hideSubmit = function() {
        setTimeout(() => {
          document.getElementsByName("data[submit]")[0].style.display = 'none'
        }, 150);
      }

    const AddToWaitlistButtons = function(props) {
        const { showButton, addToWaitlist } = props;
        return (
          <div>
            {showButton && (
              <div className="mt-3 text-right">
                <Button
                  className="btn-info-tracker"
                  onClick={e => addToWaitlist()}
                >
                  {LanguageLabelSelects("addToWaitlist")}
                </Button>
              </div>)
            }
          </div>
        )
    }

    return (<LayoutWaitlist>
        <Card.Body className={styles.cardBody}>
            <Row className="mt-3 container-general-form">
                aqui va NewContactSchedule
            </Row>

            <AcceptElectronicCommunications
                acceptConcent={acceptConcent}
                setAcceptConcent={setAcceptConcent}
                notValingData={notValingData}
            />

            {currectWaitlist && !currectWaitlist.enableSurvey && (
            <AddToWaitlistButtons
            acceptConcent={acceptConcent}
            setAcceptConcent={setAcceptConcent}
            showButton={showButton}
            notValingData={notValingData}
            addToWaitlist={clickAddToWaitlist}
            />
            )}

            {currectWaitlist && currectWaitlist.enableSurvey && acceptConcent && (
                <div className="mt-3 text-right">
                <Button
                    className="btn-info-tracker"
                    onClick={e => goToSurvey()}
                >
                    {LanguageLabelSelects("next")}
                </Button>
                </div>
            )}
        </Card.Body>
    </LayoutWaitlist>)
}

export default WaitList; 