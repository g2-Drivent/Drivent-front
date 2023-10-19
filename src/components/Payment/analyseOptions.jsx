export function AnalyseOptions(array){
    if (array.length=== 0) {
        return {booleans:{hasRemote:false, hasPresential:false,hasHotelOption:false,hasWithoutHotelOption:false},prices:{ remoteTicketPrice:0, presentialTicketPrice:0, HotelOptionPrice:0},ids:{remoteTicketId:-1,presentialHotelId:-1,presentialNoHotelId:-1}};
    }
    const remote = array.filter((ticketType)=>ticketType.isRemote === true);
    const presential = array.filter((ticketType)=>ticketType.isRemote === false);
    let withHotel = [];
    let withoutHotel = [];
    
    if(presential.length > 0){
        withHotel = presential.filter((ticketType)=>ticketType.includesHotel === true);
        withoutHotel = presential.filter((ticketType)=>ticketType.includesHotel === false);
    }

    const hasRemote = (remote.length > 0);
    const hasPresential = (presential.length > 0);
    const hasHotelOption = (withHotel.length > 0);
    const hasWithoutHotelOption = (withoutHotel.length>0);

    let presentialTicketPrice = 0;
    let remoteTicketPrice = 0;
    let HotelOptionPrice = 0;

    const remoteTicketId = hasRemote? remote[0].id: null;
    const presentialHotelId = hasHotelOption? withHotel[0].id: null;
    const presentialNoHotelId = hasWithoutHotelOption? withoutHotel[0].id: null;

    if(hasRemote){
        remoteTicketPrice = remote[0].price;
    }
    if(hasPresential){
        if(hasHotelOption){
            if(hasWithoutHotelOption){
                presentialTicketPrice = withoutHotel[0].price;
                HotelOptionPrice = withHotel[0].price - withoutHotel[0].price;
            } else{
                presentialTicketPrice = withHotel[0].price ;
            }
        } else{
            presentialTicketPrice = withoutHotel[0].price; 
        }
    }

    return {booleans:{hasRemote, hasPresential,hasHotelOption,hasWithoutHotelOption},prices:{ remoteTicketPrice, presentialTicketPrice, HotelOptionPrice},ids:{remoteTicketId,presentialHotelId,presentialNoHotelId}};
}