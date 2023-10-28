import styled, { keyframes } from "styled-components"
import enter from "../../assets/enter_icon.svg";
import check from "../../assets/green_check.svg";
import cross from "../../assets/red_cross.svg";
import Loader from "react-loader-spinner";
import { useState } from "react";
import { joinActivity } from "../../services/activitiesApi";
import useToken from "../../hooks/useToken";
import { toast } from "react-toastify";

// Status enum:
// "joined"
// "open"
// "closed"
// "loading" when waiting server response. 

// eslint-disable-next-line react/prop-types
export function Activity({activityId, title, subTitle, duration = 60, spacesLeft, status = "open"}) {

    const [internalStatus, setInternalStatus] = useState(status);
    const token = useToken(); // pouquissimo otimizado..
    

    async function Join() {
        if(internalStatus !== "open") return;

        setInternalStatus("loading");
        const response = await joinActivity(token, activityId);
        if(response === 409) {
            toast("Você não pode se inscrever nessa atividade pois já está inscrito em outra atividade nesse horário. Caso considere isso um erro, contate a organização do evento.")
            setInternalStatus("open");
        }
        if(response === 201) { 
            toast("Inscrição na atividade realizada com sucesso!")
            setInternalStatus("joined");
        }
    }

    return (
        <ActivityComponent $duration={duration} $status={internalStatus} >
            <div>
                <h1>{title ?? "Sem título"}</h1>
                <h2>{subTitle ?? "Horário não especificado"}</h2>
            </div>

            <button onClick={Join}>
                {
                    // Button icon selection based on status argument.
                    internalStatus === "open" && spacesLeft ? <img src={enter}/> : 
                    internalStatus === "joined"             ? <img src={check}/> : 
                    internalStatus === "closed"             ? <img src={cross}/> :
                    internalStatus === "loading"            ? <Loader color="#FA4098" height={32} width={32} type="ThreeDots"/> :
                    `Invalid activity status ${internalStatus}.`
                }
                {
                    // Button text selection also based on status arg.
                    internalStatus === "open" && spacesLeft ? <p>{spacesLeft} vagas</p> : 
                    internalStatus === "joined"             ? <p>Inscrito</p> : 
                    internalStatus === "closed"             ? <p>Esgotado</p> :
                    internalStatus === "loading"            ? "" :
                    `Invalid activity status ${internalStatus}.`
                }
            </button>


        </ActivityComponent>
    )
}

const showUp = keyframes`
    from {
        position: relative;
        top: -8px;
        opacity: 0;
    }

    40% {
        top: 0px
    }

    to {
        opacity: 100%;
    }
`

const ActivityComponent = styled.div`

    width: 100%;
    height: ${p => (p.$duration * 80)/60}px;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 5px;

    background: ${p => p.$status === "joined" ? "#D0FFDB" : "#F1F1F1"};

    animation: ${showUp} 0.2s ease-in ;

    div {
        height: 100%;
        width: 100%;

        padding: 12px 0px 12px 10px;
	    background: ${p => p.$status === "joined" ? "#D0FFDB" : "transparent"};

        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: #343434; 

        h1 {
            animation: ${showUp} 0.4s linear ;
        }
        
        h2 {
            animation: ${showUp} 0.8s linear ;
            margin-top: 6px;
            font-weight: 400;
        }
    }

    button {
        box-sizing: border-box;
        height: 80%;
        width: 100px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: none;
        border-left: 2px solid ${p => p.$status === "joined" ? "#99E8A1" : "#CFCFCF"};
	    
	    background: ${p => p.$status === "joined" ? "#D0FFDB" : "transparent"};

        color: ${p => p.$status === "closed" ? "#CC6666" : "#078632"};

        // loader css
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
        }
    }
`
