import AuthLayout from "../../layouts/Auth";
import EventInfoContext from '../../contexts/EventInfoContext';
import { Label, Row, Title } from "../../components/Auth";
import styled from "styled-components";
import { CircularProgress, LinearProgress, ThemeProvider, colors, createTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";



export default function GitHubSign(){
    const { eventInfo } = useContext(EventInfoContext);
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const nav = useNavigate();
    useEffect(()=>{
        if(code === '') nav("/sign-in");
    },[]);

    return(

            <AuthLayout background={eventInfo.backgroundImageUrl}>
                <Row>
                    <SuperContainer>
                        <ion-icon name="logo-github"></ion-icon>
                    </SuperContainer>
                </Row>
                <Row>
                    <Title>
                        Validando login ...
                    </Title>
                </Row>
                <Row>
                    <CircularProgress color="primary"/>
                </Row>
            </AuthLayout>

    )
}

const SuperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 200px;
    margin-top: 6vh;
    margin-bottom: 4vh;
`