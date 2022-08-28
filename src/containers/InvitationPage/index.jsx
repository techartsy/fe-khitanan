import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isIOS } from 'react-device-detect';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import {
  getAllGuest,
  submitRegistration,
  resetErrorPost,
  postGiftConfirmation,
  resetConfirmationError,
  resetConfirmationSuccess
} from '../../store/actions';

import { ImMic } from "react-icons/im";

import useWindowDimensions from '../../utils/useWindowDimensions';
import StartedComponent from '../../components/Started';
import AudioComponent from '../../components/AudioPlayer';
import PopupProkes from '../../components/PopupProkes';
import PopupGiftConfirmation from '../../components/PopupGiftConfirmation';
import PopupVoiceRecognition from '../../components/PopupVoiceRecog';

import ksection2 from '../../static/images/ksection2.png';
import ksection3 from '../../static/images/ksection3.png';
import ksection31 from '../../static/images/ksection31.png';
import Male from '../../static/images/male.png';
import Female from '../../static/images/female.png';
import WingTop from '../../static/images/wing-top.png';
import WingBottom from '../../static/images/wing-bottom.png';
import Frame from '../../static/images/frame.png';
import wingg from '../../static/images/wingg.png';
import topevent from '../../static/images/topevent.png';
import kattendingmeessage from '../../static/images/kattendingmeessage.png';
import gunungan from '../../static/images/gunungan.png';
import MessageImg from '../../static/images/kgreetingsection.png';
import ClosingWing from '../../static/images/closing-wing.png';
import wingribbon from '../../static/images/wingribbon.png';
import rosegift from '../../static/images/rosegift.png';
import creditcard from '../../static/images/creditcard.png';
import numbercopy from '../../static/images/numbercopy.png';
import logoGold from '../../static/images/logoGold.png';
import logoSm from '../../static/images/logo-sm.png';
import calender from '../../static/icons/calender.png';
import time from '../../static/icons/time.png';
import Location from '../../static/icons/location.png';
import plane from '../../static/icons/plane.png';
import dropdown from '../../static/icons/dropdown.png';
import dropup from '../../static/icons/dropup.png';
import Mail from '../../static/icons/mail.png';
import whatsapp from '../../static/icons/whatsapp.png';
import Story from '../../static/images/story.png';
import ThirdImageSM from '../../static/images/thirdimage-sm.png';
import ArRum from '../../static/images/Ar-rum.png';
import classes from './style.module.scss';

const InvitationPage = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowGift, setIsShowGift] = useState(false);
  const [closeGift, setCloseGift] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState('');
  const [attend, setAttend] = useState('');
  const [showPopupProkes, setShowPopupProkes] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [notif, setNotif] = useState('');
  const [gifNotif, setGiftNotif] = useState('');
  const [openPopupVoiceRecog, setOpenPopupVoiceRecog] = useState(false);
  let [popupCounter, setPopupCounter] = useState(0);
  const wording = '1260010034469';
  const giftAddress = 'Jl. Sambiroto VII RT.10 RW.02, Tembalang, Semarang';
  const dispatch = useDispatch();
  const location = useLocation();
  let name = location?.search?.split('=')[1];
  name = name?.split('+').join(' ');
  const { width } = useWindowDimensions();
  
  var gapi = window.gapi;
  var CLIENT_ID = '545719587697-3b26seil317l47iehsuqb1l1a7i8r93k.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyAspcebNucyZ-lYgmuHOwyu3CNaqfk9CiY';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";


  const messages = useSelector(state => state.invitationReducer.messages);
  const isError = useSelector(state => state.invitationReducer.isError);
  const confirmationErrorMessage = useSelector(state => state.invitationReducer.confirmationErrorMessage);
  const confirmationSuccess = useSelector(state => state.invitationReducer.confirmationSuccess);
  
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [note, setNote] = useState('' || transcript);

  const onStartRecognition = () => {
    console.log('masuk')
    SpeechRecognition.startListening({
      continuous: true,
      language: 'id'
    })
  }

  const onChangeNote = (text) => {
    setNote(text);
    if (note.length === 0) {
      resetTranscript();
    }
  }

  const copyText = () => {
    navigator.clipboard.writeText(wording)
    setNotif('Copied')
    setTimeout(() => {
      setNotif('')
    }, 3000)
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(giftAddress);
    setGiftNotif('Copied');
    setTimeout(() => {
      setGiftNotif('');
    }, 3000);
  };

  const addEvent = () => {
    console.log(window, '<< window')
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('opened'));
      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        var event = {
          'summary': 'Gilang & Vina Wedding Day',
          'location': 'Jl. Sambiroto VII RT.10 RW.02, Tembalang, Semarang',
          'description': 'Wedding Invitation',
          'start': {
            'dateTime': '2022-07-17T10:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'end': {
            'dateTime': '2022-07-17T23:00:00',
            'timeZone': 'Asia/Jakarta',
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
          },
        };

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })
        request.execute(response => {
          console.log(response, '<< response')
          window.open(response.htmlLink)
        })
      })
    })
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  useEffect(() => {
    dispatch(getAllGuest())
  }, []);

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'success',
        title: 'Pesan Terkirim',
        background: 'black',
      })
      setTimeout(() => {
        dispatch(resetErrorPost());
      }, 1000);
    };
  }, [isError])

  useEffect(() => {
    if (!_.isEmpty(confirmationErrorMessage)) {
      Toast.fire({
        icon: "error",
        title: `${confirmationErrorMessage}`,
        background: "black",
        color: "#fbd258",
        customClass: {
          container: 'swal-overlay'
        }
      });
      setTimeout(() => {
        dispatch(resetConfirmationError())
      }, 2000);
    };
  }, [confirmationErrorMessage])

  useEffect(() => {
    if (confirmationSuccess) {
      Toast.fire({
        icon: "success",
        title: "Konfirmasi Berhasil",
        background: "black",
        textColor: "#fbd258",
        customClass: {
          container: 'swal-overlay'
        }
      });
      setTimeout(() => {
        dispatch(resetConfirmationSuccess())
      }, 2000);
      setOpenConfirmation(!openConfirmation);
    };
  }, [confirmationSuccess]);

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let nextYear;
    let difference;
    if (isIOS) {
      nextYear = year;
      let fullDate = "2022-07-17 09:00:00";
      let date = new Date(fullDate);
      // In case its IOS, parse the fulldate parts and re-create the date object.
      if(Number.isNaN(date.getMonth())) {
        let arr = fullDate.split(/[- :]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      }
      difference = +date - +new Date();
    } else {
      difference = +new Date(`07/17/${year}/09:00`) - +new Date();
    }
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)) ? Math.floor(difference / (1000 * 60 * 60 * 24)) : '00',
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24) ? Math.floor((difference / (1000 * 60 * 60)) % 24) : '00',
        Menit: Math.floor((difference / 1000 / 60) % 60) !== 0 ? Math.floor((difference / 1000 / 60) % 60) : '00',
        Detik: Math.floor((difference / 1000) % 60) !== 0 ? Math.floor((difference / 1000) % 60) : '00'
      };
    } else {
      timeLeft = {
        Hari: '00',
        Jam: '00',
        Menit: '00',
        Detik: '00'
      };
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    };

    timerComponents.push(
      <div className={classes.countdownItem}>
        <div className={classes.countdownTime}>
          {timeLeft[interval]}
        </div>
        <div className={classes.countdownInterval}>
          {interval}{" "}
        </div>
      </div>
    );
  });

  const closePopupProkes = () => {
    setShowPopupProkes(!showPopupProkes);
  };

  const openInvitation = () => {
    setIsInvitationOpen(!isInvitationOpen);
    setShowPopupProkes(!showPopupProkes);
    setIsPlaying(!isPlaying);
  };

  const handleConfirmation = () => {
    setOpenConfirmation(!openConfirmation);
  };

  const showFormAttending = () => {
    if (browserSupportsSpeechRecognition) {
      if (!isShow && popupCounter === 0) {
        setPopupCounter(popupCounter += 1)
        setOpenPopupVoiceRecog(!openPopupVoiceRecog);
      }
    }
    setIsShow(!isShow)
  };

  const showGiftInfo = () => {
    if (isShowGift) {
      setIsShowGift(!isShowGift)
      setTimeout(() => {
        setCloseGift(!closeGift)
      }, 1500);
    } else {
      setIsShowGift(!isShowGift)
      setCloseGift(!closeGift)
    };
  };

  const goToMaps = () => {
    window.open('https://goo.gl/maps/E3guzxp6gxcionVJ6', '_blank');
  };

  const radioAttend = (e) => {
    setAttend(e.target.value);
  };

  const onSubmitRadios = (e) => {
    e.preventDefault();
    const payload = {
      name: guestName,
      address,
      attend,
      message: note,
      pax: '',
    }
    dispatch(submitRegistration(payload, Toast.fire({
      icon: 'success',
      title: 'Pesan Terkirim',
      background: 'black',
      color: '#fbd258',
    })));
    setGuestName('');
    setAddress('');
    setNote('');
    resetTranscript();
  };

  const submitGiftConfirmation = (value) => {
    dispatch(postGiftConfirmation(value));
  };
  const generateHeader = () => {
    return (
      <div className={classes.header}>
        <Fade delay={2000} duration={3000}>
          <div className={classes.headerAnimation}>
            <div className={classes.headerTitle}>
              <p className={classes.titleTop}>Gilang</p>
              <p className={classes.titleMid}>&</p>
              <p className={classes.titleBottom}>Vina</p>
            </div>
          </div>
        </Fade>
        <div className={classes.countdown}>
          {timerComponents.length && timerComponents}
        </div>
      </div >
    );
  };

  const generateStory = () => {
    return (
      <div className={classes.storySection}>
        <div className={classes.storyWrapper}>
          <div className={classes.story}>
            <Fade when={!showPopupProkes} left duration={3000}>
              <p>Sebab kurasa ini sangat spiritual <br/>
              Ku tak bisa tulis yang indah<br/>
              Dan berbunga-bunga<br/>
              Yang kuingin langsung saja menikam di hati<br/>
              Ku tak rela kau menangis.
              </p>
              <p className={classes.quoteAuthor}>~ Jason Ranti ~</p>
            </Fade>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <img src={ksection2} alt='Brides' />
        </div>
      </div>
    );
  };

  const generateSecondStory = () => {
    return (
      <div className={classes.secondStoryContainer}>
        <div className={classes.imageWrapper}>
          <img src={ksection3} alt="Brides" />
        </div>
        <div className={classes.storyWrapper}>
          <div className={classes.story}>
            <Fade when={!showPopupProkes} right duration={3000}>
              <p>
                Saat tak tahu arah kau disana<br/>
                Menjadi gagah saat ku tak bisa<br/>
                Sedikit ku jelaskan tentangku dan kamu<br/>
                Agar seisi dunia tahu<br/>
                Keras kepalaku sama denganmu<br/>
                Caraku marah, caraku tersenyum<br/>
                Seperti detak jantung yang bertaut<br/>
                Nyawaku nyala karena denganmu<br/>
                Aku masih ada sampai di sini<br/>
                Melihatmu kuat setengah mati<br/>
                Seperti detak jantung yang bertaut<br/>
                Nyawaku nyala karena denganmu
              </p>
            </Fade>
            <Fade when={!showPopupProkes} right duration={3000}>
              <div className={classes.logoContainer}>
                <img src={ksection31} className={classes.quoteAuthor} alt="logo" />
              </div>
            </Fade>
          </div>
          <Fade when={!showPopupProkes} right duration={3000}>
            <p className={classes.author}>~ Nadin Amizah ~</p>
          </Fade>
        </div>
      </div>
    );
  };

  const secondImageSection = () => {
    return (
      <div className={classes.paralaxx}>
        <div className={classes.paralaxxWraper}>
        </div>
      </div>
    );
  };

  const iosSecondImageSection = () => {
    return (
      <div className={classes.iosSecondImageSection}>
        <img src={Story} className={classes.secondImageIOS} alt="secondary" />
      </div>
    );
  };

  const summarySection = () => {
    return (
      <div className={classes.summary}>
        <div className={classes.bg}>
          <div className={classes.summaryWraper}>
            <Fade duration={4000}>
              <div className={classes.title}>
                <p>
                  QS. Ar-Rum ayat 21
                </p>
              </div>
              <div className={classes.summaryAnimation}>
                <img src={ArRum} alt="Ar-Rum" className={classes.verse} />
                <div className={classes.separator} />
                <p className={classes.summarySection}>
                  “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia<br />
                  menciptakan pasangan-pasangan untukmu dari jenismu sendiri, <br />
                  agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan <br />
                  di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu <br />
                  benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”<br /><br />
                </p>
              </div>
              <img src={wingg} alt='wingBottom' />
            </Fade>
          </div>
        </div>
      </div>
    );
  };

  const generateBridesProfile = () => {
    return (
      <div className={classes.bridesProfileContainer}>
        <div className={classes.wingWrapper}>
          <img className={classes.image} src={WingTop} alt="wing" />
        </div>
        <div className={classes.profileWrapper}>
          <Fade left duration={3000}>
            <div className={classes.card}>
              <img className={classes.bridesImage} src={Female} alt="brides" />
              <div className={classes.profileInfo}>
                <p className={classes.bridess}>Vina Fajarwati</p>
                <p className={classes.parents}>Putri Terakhir dari{width === 'lg' && <br />} Bapak Sudirjan (Alm) & Ibu Jariyah</p>
              </div>
            </div>
          </Fade>
          <Fade right duration={3000}>
            <div className={classes.card}>
              <img className={classes.bridesImage} src={Male} alt="brides" />
              <div className={classes.profileInfo}>
                <p className={classes.bridess}>Gilang Firdaus</p>
                <p className={classes.parents}>Putra Pertama dari{width === 'lg' && <br />} Bapak Dani Hidayat & Ibu Fera</p>
              </div>
            </div>
          </Fade>
        </div>
        <div className={classes.wingWrapper}>
          <img className={classes.image} src={WingBottom} alt="wing" />
        </div>
      </div>
    );
  };

  const eventDetail = () => {
    return (
      <div className={classes.event}>
        <Fade delay={1000} duration={4000}>
          <img className={classes.topEvent} src={topevent} alt='top' />
          <div className={classes.greeting}>
            <p>
              Assalamu'alaikum Warahmatullahi Wabarakatuh<br />
            </p>
            <p className={classes.subtitle}>
              Maha Suci Allah {width !== 'lg' && <br />} yang telah menciptakan makhluk-Nya berpasang-pasangan. <br />
              Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami
            </p>
          </div>
          <div className={classes.details}>
            <div className={classes.titleWraper}>
              <p className={classes.title}>AKAD & RESEPSI</p>
            </div>
            <div className={classes.calender}>
              <img src={calender} alt='calender' />
              <p>
                MINGGU, 17 JULI 2022
              </p>
            </div>
            <div className={classes.timesWraper}>
              {width === 'lg' ? (
                <>
                  <div className={classes.time}>
                    <img src={time} alt='time' />
                    <p>AKAD : PUKUL 09.00 WIB</p>
                  </div>
                  <div className={classes.time}>
                    <img src={time} alt='time' />
                    <p>
                      RESEPSI : PUKUL 10.00 WIB s/d Selesai
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.timeMobileWrapper}>
                    <img src={time} alt='time' />
                    <p>AKAD 09.00 WIB</p>
                    <div className={classes.separator} />
                    <p>RESEPSI 10.00 WIB - SELESAI</p>
                  </div>
                </>
              )}
            </div>
            <div className={classes.btnCalendarContainer}>
              <div className={classes.btnCalendarWrapper} onClick={addEvent}>
                <p>Tambahkan ke Kalender</p>
              </div>
            </div>
            <div className={classes.locationWraper}>
              <img src={Location} alt='location' />
              <p>
                JL. SAMBIROTO VII RT.10 RW.02 KEC.TEMBALANG KOTA SEMARANG
              </p>
            </div>
            <div onClick={goToMaps} className={classes.btnmap}>
              <p>Menuju Lokasi</p>
              <div className={classes.imageWrapper}>
                <img src={plane} alt='gotomap' />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  };

  const thirdImageSeparator = () => {
    return (
      <div>
        <div className={classes.thirdImageSection}>
          <div className={classes.paralaxxWraper}></div>
        </div>
      </div>
    );
  };

  const iosThirdImageSeparator = () => {
    return (
      <div>
        <div className={classes.iosThirdImageSeparator}>
          <img src={ThirdImageSM} alt="" className={classes.thirdImage} />
        </div>
      </div>
    );
  };

  const attendingSection = () => {
    return (
      <div className={classes.attendingContainer}>
        <p className={classes.title}>"UCAPAN & DOA"</p>
        <div className={classes.attendingWraper}>
          <div className={classes.formWraper}>
            <div className={classes.dropdownSection} onClick={showFormAttending}>
              <p className={classes.formTitle}>Konfirmasi Kehadiran</p>
              <div className={classes.icon}>
                <img src={isShow ? dropup : dropdown} alt="dropdown" />
              </div>
            </div>
            <form className={`${classes.formContainer} ${!isShow ? classes.hide : classes.show}`} onSubmit={onSubmitRadios}>
              <div className={classes.inputForm}>
                <div className={classes.inputs}>
                  <input type='text' value={guestName} placeholder='Nama' required onChange={(e) => setGuestName(e.target.value)} />
                  <input type='text' placeholder='Alamat' value={address} required onChange={(e) => setAddress(e.target.value)} />
                  <textarea type='text' placeholder='Kirim Ucapan & Doa' value={note || transcript} onChange={(e) => onChangeNote(e.target.value)} />
                  {browserSupportsSpeechRecognition &&
                    <div className={classes.iconContainer}>
                      <div
                        onTouchStart={onStartRecognition}
                        onMouseDown={onStartRecognition}
                        onTouchEnd={SpeechRecognition.stopListening}
                        onMouseUp={SpeechRecognition.stopListening}
                        className={classes.micWrapper}
                      >
                        <ImMic className={classes.mic} />
                      </div>
                    </div>}
                </div>
              </div>
              <div onChange={radioAttend} className={classes.radiosInput}>
                <div className={classes.inputs}>
                  <p>Konfirmasi</p>
                  <div className={classes.radioWrapper}>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' value='present' required ></input>
                      <label for='attend'>Akan Hadir</label>
                    </div>
                    <div className={classes.radioItem}>
                      <input className={classes.radioItem} type='radio' name='attend' value='absence' required></input>
                      <label for='attend'>Berhalangan Hadir</label>
                    </div>
                  </div>
                </div>
                <button type='submit' className={classes.btnSend}>Kirim Ucapan</button>
              </div>
            </form>
          </div>
          <Fade duration={3000}>
            <div className={classes.expressionSection}>
              <img src={kattendingmeessage} alt="attending" />
              <p className={classes.expression}>
                Ungkapan terima kasih yang tulus dari kami apabila<br />
                Bapak/Ibu/Teman-teman berkenan hadir dan memberikan do'a restu
              </p>
            </div>
          </Fade>
        </div>
      </div >
    );
  };

  const generateMessageSection = () => {
    return (
      <div className={classes.messageSectionContainer}>
        <div className={classes.sectionTitle}>
          <p>Ucapan & Doa kamu</p>
        </div>
        <div className={classes.mainContent}>
          <Fade duration={3000}>
            <div className={classes.leftSection}>
              <img src={gunungan} alt="gunungan" />
              <p>“ Seutas Doa & Ucapan Untuk Kedua Mempelai ”</p>
            </div>
          </Fade>
          <div className={classes.rightSection}>
            <div className={classes.imgWrapper}>
              <img className={classes.image} src={MessageImg} alt="message" />
            </div>
            <div className={classes.messageWrapper}>
              {messages && messages.map((item, idx) => {
                return (
                  <div className={classes.messageItemWrapper} key={idx}>
                    <div className={classes.avatar}>
                      <img src={Mail} alt='avatar' />
                    </div>
                    <div className={classes.messageShape}>
                      <div className={classes.outerTriangle}>
                        <div className={classes.innerTriangle} />
                      </div>
                      <div className={classes.messageBubble}>
                        <div className={classes.name}>
                          {item.name}...
                        </div>
                        <div className={classes.message}>
                          {item.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const giftSection = () => {
    return (
      <div className={classes.giftContainer}>
        <div className={classes.giftWraper}>
          <div className={classes.tittleRibbon}>
            <p className={classes.titleGift}>"Hadiah Pernikahan"</p>
            <img className={classes.ribbon} src={wingribbon} alt="wing" />
          </div>
          <div className={classes.dropdownSection} onClick={showGiftInfo}>
            <p className={classes.title}>Kirim Hadiah</p>
            <div className={classes.icon}>
              <img src={isShowGift ? dropup : dropdown} alt='dropdown' />
            </div>
          </div>
          <div className={`${classes.giftInfoWraper} ${isShowGift ? classes.showGift : classes.hideGift} ${closeGift ? classes.closeGift : ''}`}>
            <div className={classes.imageDetail}>
              <img className={classes.rose} src={rosegift} alt="rose" />
              <img className={classes.card} src={creditcard} alt="credit-card" />
              <div className={classes.copyWraper}>
                <img className={classes.copy} src={numbercopy} onClick={copyText} alt="copy-text" />
                <p className={classes.notifCopy}>{notif}</p>
              </div>
            </div>
            <div className={classes.infoWrapper}>
              <p className={classes.infoTitle}><strong>Alamat Pengiriman Hadiah Fisik</strong></p>
              <p className={classes.infoDetail}>
                Nama : Gilang Firdaus <br />
                Alamat : Jl. Sambiroto VII RT.10 RW.02,<br />Tembalang, Semarang
              </p>
              <div className={classes.copyWraper}>
                <img className={classes.copy} src={numbercopy} onClick={copyAddress} alt="copy-text" />
                <p className={classes.notifCopy}>{gifNotif}</p>
              </div>
            </div>
            <p className={classes.closingStatement}>
              Silakan konfirmasi kirim hadiah spesial kamu
            </p>
            <div className={classes.btnConfirmation} onClick={handleConfirmation}>klik disini</div>
          </div>
        </div>
      </div>
    );
  };

  const closingSection = () => {
    return (
      <div className={classes.closingSectionContainer}>
        <Fade duration={3000}>
          <div className={classes.closingSentenceWrapper}>
            <p>
              Bagi Kami Kehadiran & doa Anda<br /> merupakan keberkahan, kehormatan serta kebahagiaan.<br />
              Dari hati yang terdalam, kami ucapkan terima kasih
            </p>
          </div>
        </Fade>
        <img src={ClosingWing} alt="wing" className={classes.image} />
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className={classes.footerContainer}>
        <p className={classes.colaboration}>In Colaboration</p>
        <img className={classes.brand} alt='techartsyGold' src={width === 'lg' ? logoGold : logoSm} />
        <a
          rel="noreferrer"
          href="https://wa.me/62895706454243?text=Hallo%20saya%20mau%20pesan%20Undangan%20..."
          target="_blank">
          <img className={classes.contact} src={whatsapp} alt="whatsapp" />
        </a>
      </div >
    );
  };

  const generateInvitation = () => {
    return (
      <div className={classes.invitationContainer}>
        {generateHeader()}
        {generateStory()}
        {generateSecondStory()}
        {!isIOS ? secondImageSection() : iosSecondImageSection()}
        {summarySection()}
        {generateBridesProfile()}
        {eventDetail()}
        {!isIOS ? thirdImageSeparator() : iosThirdImageSeparator()}
        {attendingSection()}
        {generateMessageSection()}
        {giftSection()}
        {closingSection()}
        {footerSection()}
        <AudioComponent isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <PopupProkes open={showPopupProkes} handleClose={closePopupProkes} />
        <PopupGiftConfirmation
          open={openConfirmation}
          handleClose={handleConfirmation}
          submitGiftConfirmation={submitGiftConfirmation}
          confirmationSuccess={confirmationSuccess}
        />
        <PopupVoiceRecognition
          open={openPopupVoiceRecog}
          handleClose={() => setOpenPopupVoiceRecog(!openPopupVoiceRecog)}
        />
      </div>
    );
  };
  return (
    <div className={classes.container}>
      {!isInvitationOpen ? <StartedComponent openInvitation={openInvitation} name={name} /> : generateInvitation()}
    </div>
  )
}

export default InvitationPage;