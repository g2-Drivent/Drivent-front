import AuthLayout from "../../layouts/Auth";
import EventInfoContext from '../../contexts/EventInfoContext';
import { Label, Row, Title } from "../../components/Auth";
import styled from "styled-components";
import { CircularProgress} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import useGitHubSign from "../../hooks/api/useGithubSign";
import UserContext from "../../contexts/UserContext";



export default function GitHubSign(){
    const { eventInfo } = useContext(EventInfoContext);
    const {  signIn } = useGitHubSign();
    const {setUserData} = useContext(UserContext)
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    useEffect(()=>{
        if(!code || code === '') {
            navigate("/sign-in");
        }else{
            useSubmit();
        }
    },[]);


    async function useSubmit(){
        try{
            const userData = await signIn(code);
            setUserData(userData);
            toast('Login realizado com sucesso!');
            navigate('/dashboard');
        } catch (err) {
            toast('Houve um erro inesperado com a autenticação com o github!');
            navigate('/sign-in');
        }
    }


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