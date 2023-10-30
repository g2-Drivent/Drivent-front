import React from 'react';
import { PDFViewer, Page, View, Text, Image, Document, StyleSheet, Font} from '@react-pdf/renderer';
import useEvent from '../../../hooks/api/useEvent';
import useLogo from '../../../hooks/api/useLogo';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import dayjs from 'dayjs';
import Roboto from '../../../assets/fonts/Roboto-Regular.ttf'

const PDFCertificate = () => {
    const { logo } = useLogo();
    const { enrollment } = useEnrollment();
    const { event } = useEvent();
    const { ticket } = useTicket();
    let mode;
    if (ticket)
        ticket.TicketType.isRemote ? mode = "remota" : mode = "presencial";

        Font.register({
            family: 'Roboto',
            format: "truetype",
            src: Roboto
          });

    return (
        <PDFViewer  width={"100%"} height={750} orientation="landscape">

            <Document title='Certificate'>
            {
                enrollment && ticket? 
                <Page orientation="landscape" style={styles.page}>
                    <View style={styles.columns}>                        
                        <View style={styles.margin} >
                        </View>
                        <View>
                            <View style={styles.view} >

                                <Text style={styles.title}>CERTIFICADO</Text>
                                <Text style={styles.text}>Certificamos, para todos os devidos fins, de que a(o):</Text>
                                <Text style={styles.name}>{enrollment.name}</Text>
                                <Text style={styles.text}>Com documento {enrollment.cpf.slice(0, 3)}.{enrollment.cpf.slice(3, 6)}.{enrollment.cpf.slice(6, 9)}-{enrollment.cpf.slice(9, 11)} participou do evento {event.title}, de forma {mode}, entre os dias {dayjs(event.startsAt).format('DD/MM/YYYY')} e {dayjs(event.endsAt).format('DD/MM/YYYY')}.</Text>
    
                                <View style={styles.image}>
                                    <Image src={logo} style={styles.round}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>
                : <Page orientation="landscape" style={styles.page}><Text>Gerando PDF...</Text></Page>
            }
            </Document>
        </PDFViewer>

    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        width: 1322,
        height: 864,
    },
    margin: {
        backgroundColor: "#DDDDDD",
        height: "100%",
        width: 127,
        position: "fixed",
        left: 0,
        top: 0
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        height: "100%"
    },
    view: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: "auto"
    },
    title: {
      fontSize: 87,
      marginTop: 30,
      fontFamily: 'Roboto',
      alignSelf: "center",
    },
    name: {
      fontSize: 54,
      alignSelf: "center",
      fontFamily: 'Roboto',
      marginBottom: 10
    },
    image: {
        display: 'flex',
        textAlign: "center",
        alignSelf: "center",
        width: 90,
        height: 90,
        position: "relative",
        overflow: "hidden",
        borderRadius: "100%"
    },
    round: {
        display: "inline",
        margin: "0 auto",
       // marginLeft: "-25%",
        height: "100%",
        width: "auto"
    },
    text: {
      margin: 20,
      marginLeft:30,
      marginRight:30,
      fontSize: 20,
      alignSelf: "center",
      fontFamily: 'Roboto',
      display: "block",
      maxWidth: 650
    }
  });

export default PDFCertificate;