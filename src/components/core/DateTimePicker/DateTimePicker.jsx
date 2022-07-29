import * as React from "react";
import ReactDateTimePicker from 'react-datetime-picker/dist/entry.nostyle'; 
import 'react-calendar/dist/Calendar.css'; 
import 'react-clock/dist/Clock.css'; 
import 'react-datetime-picker/dist/DateTimePicker.css';

export default function DateTimePicker(props) {
    return (
        <div>
            <ReactDateTimePicker value={props.value} onChange={props.onChange}/>
        </div>
    )
}