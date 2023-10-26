import styled, { ThemeProvider } from 'styled-components';

function redirectToGitHub(){
    alert("Redirecionando para o gitHub");
    
    const GITHUB_URL = import.meta.env.VITE_API_GITHUB_URL;
    const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_API_REDIRECT_URI;

    const params = new URLSearchParams({
        response_type: 'code',
        scope:'user',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI
    });
    const authURL= `${GITHUB_URL}?${params.toString()}`;

    window.location.href = authURL;
}


export default function GitHUbButton(){

    
    return (
            <StyledMuiButton onClick={redirectToGitHub}>
                <ion-icon name="logo-github"></ion-icon>
                ENTRAR COM O GITHUB
            </StyledMuiButton>
    )
}

const StyledMuiButton = styled.button`
    margin-top: 8px !important;
    color: white;
    border: none;
    border-radius: 4px;
    background-color: #2b3137;
    width: 100%;
    height: 37px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    ion-icon{
        font-size: 20px;
        margin-right: 10px;
    }
    &:hover{
        background-color: 	#24292e;
        cursor: pointer;
    }
`;
