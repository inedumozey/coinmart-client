import Countdown from 'react-countdown';
import { useState } from "react";

export default function CountdownTimer({ stopDate, startDate }) {
    const [start, setStart] = useState(true)
    const [stop, setStop] = useState(false)

    return (
        <>
            <div style={{ display: 'flex' }}>
                <span
                    style={{
                        fontWeight: 'bold',
                        borderRadius: '6px',
                    }}>
                    {
                        !start ? '' :
                            <div>
                                Starts In: <Countdown renderer={({ days, hours, minutes, seconds, completed }) => {
                                    if (completed) {
                                        setStart(false)
                                    } else {
                                        return <span style={{ color: 'red' }}>{days} : {hours} : {minutes} : {seconds} </span>
                                    }
                                }} date={new Date(startDate)}>
                                </Countdown>
                                {" "} {`(${'D:H:M:S'})`}
                            </div>
                    }

                    {
                        !stop && !start ?
                            <div>
                                Stops In: <Countdown renderer={({ days, hours, minutes, seconds, completed }) => {
                                    if (completed) {
                                        setStop(true)
                                    } else {
                                        return <span style={{ color: 'red' }}>{days} : {hours} : {minutes} : {seconds}</span>
                                    }
                                }} date={new Date(stopDate)}>
                                </Countdown>
                                {" "} {`(${'D:H:M:S'})`}
                            </div> : ''
                    }

                    {stop && !start ? <div style={{ color: 'red' }}>Contest is Over</div> : ''}
                </span>
            </div>

        </>
    )
}