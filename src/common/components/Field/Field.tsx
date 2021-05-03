import './Field.scss';
import React from "react";

type FieldProps = {
    label : string,
    children: React.ReactNode
}

export function Field({label, children} :  FieldProps) {
    return <div className={'field'}>
        <label className={'field__label'}>{label}</label>
        {children}
    </div>
}