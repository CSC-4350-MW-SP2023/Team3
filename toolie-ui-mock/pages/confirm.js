import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components'
import Map from './components/Map';
import { useRouter } from 'next/router';
import ToolSelector from './components/ToolSelector';
import Link from 'next/link';

function Confirm() {
    const router = useRouter();
    const { pickup, dropoff } = router.query;

    const [pickupCoordinates, setPickupCoordinates] = useState([-77.0363,38.8952 ]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([-77.0363,38.8952 ]);

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiZGV2bGlucm9jaGEiLCJhIjoiY2t2bG82eTk4NXFrcDJvcXBsemZzdnJoYSJ9.aq3RAvhuRww7R_7q-giWpA',
                limit: 1,
            })
        )
        .then(response => response.json())
        .then(data => {
        });
    };

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoiZGV2bGlucm9jaGEiLCJhIjoiY2t2bG82eTk4NXFrcDJvcXBsemZzdnJoYSJ9.aq3RAvhuRww7R_7q-giWpA',
                limit: 1,
            })
        )
        .then(response => response.json())
        .then(data => {
        });
    };

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff]);

    return (
        <Wrapper>
            <BackButtonContainer>
                <Link href='/search' >
                    <BackButton src='https://img.icons8.com/ios-filled/50/000000/left.png' />
                </Link>
            </BackButtonContainer>
            <Map
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <ToolSelector
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
                />

                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm Listing
                    </ConfirmButton>
                </ConfirmButtonContainer>

            </RideContainer>
        </Wrapper>
    )
};

export default Confirm

const Wrapper = tw.div`
    flex h-screen flex-col
`

const RideContainer = tw.div`
    flex flex-col flex-1 h-1/2
`

const ConfirmButtonContainer = tw.div`
    border-t-2
`

const ConfirmButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center text-xl
`

const BackButtonContainer = tw.div`
    absolute rounded-full top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`

const BackButton = tw.img`
    h-full object-contain
`