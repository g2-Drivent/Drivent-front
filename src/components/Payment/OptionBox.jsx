import styled from "styled-components";

export default function OptionBox({description,price,selected,clickFunction}){
    //console.log(description);
    return(
            <NormalOptionContainer selected={selected} onClick={clickFunction}>
                <DescriptionText>{description}</DescriptionText>
                <PriceText>{price}</PriceText>
            </NormalOptionContainer>
    )
}

const  NormalOptionContainer = styled.div`
    width: 145px;
    height: 145px;
    border-radius: 20px;
    background-color: ${props => (props.selected === null)? 'white' : (props.selected? '#FFEED2' : 'white')};
    border: 1px solid #CECECE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor: pointer;
        background-color: #FFEED2;
    }
`

const  SelectedOptionContainer = styled.div`
    width: 145px;
    height: 145px;
    border-radius: 20px;
    background-color: #FFEED2;
    border: 1px solid #CECECE;
`

const DescriptionText = styled.div`
    color: #454545;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height:19px;
`
const PriceText = styled.div`
    color: #898989;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height:17px;    
`