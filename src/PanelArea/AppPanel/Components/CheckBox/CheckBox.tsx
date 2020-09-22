import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/reducers';

function CheckBox(props: {checked: boolean, text: string, onChange: Function}){
    const [checked, setChecked] = useState(false);
    const ref = useRef(null);
    const {fontConfig} = useSelector((state: RootState)=> state.configReducer);

    useEffect(()=>{
        setChecked(props.checked)
    },[props.checked])

    function handleCheckChange(event: any){
        setChecked(!checked)
        props.onChange(!checked);
    }

    return(
        <Form>
            <Form.Check 
                ref={ref}
                type={"checkbox"}                            
                label={props.text}
                checked = {checked}
                onChange = {handleCheckChange}
                style={{color : fontConfig.fontColor}}
            />
        </Form>
    )
}

export default CheckBox