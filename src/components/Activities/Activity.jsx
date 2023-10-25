import styled from "styled-components"
import enter from "../../assets/enter_icon.svg";
import check from "../../assets/green_check.svg";
import cross from "../../assets/red_cross.svg";

// Status enum:
// "joined"
// "open"
// "closed"

// eslint-disable-next-line react/prop-types
export function Activity({title, subTitle, duration = 60, spacesLeft, status = "open"}) {

    return (
        <ActivityComponent $duration={duration} $status={status} >
            <div>
                <h1>{title ?? "Sem título"}</h1>
                <h2>{subTitle ?? "Horário não especificado"}</h2>
            </div>

            <button>
                {
                    // Button icon selection based on status argument.
                    status === "open" && spacesLeft ? <img src={enter}/> : 
                    status === "joined"             ? <img src={check}/> : 
                    status === "closed"             ? <img src={cross}/> :
                    `Invalid activity status ${status}.`
                }
                {
                    // Button text selection also based on status arg.
                    status === "open" && spacesLeft ? <p>{spacesLeft} vagas</p> : 
                    status === "joined"             ? <p>Inscrito</p> : 
                    status === "closed"             ? <p>Esgotado</p> :
                    `Invalid activity status ${status}.`
                }
            </button>

        </ActivityComponent>
    )
}

const ActivityComponent = styled.div`

    width: 100%;
    height: ${p => (p.$duration * 80)/60}px;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 5px;

    background-color: #F1F1F1;

    div {
        height: 100%;
        width: 100%;

        padding: 12px 0px 12px 10px;

        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: #343434; 

        h2 {
            margin-top: 6px;
            font-weight: 400;
        }
    }

    button {
        box-sizing: border-box;
        height: 80%;
        width: 100px;

        border: none;
        border-left: 2px solid #CFCFCF;
        background: transparent;

        color: ${p => p.$status === "closed" ? "#CC6666" : "#078632"};
    }
`