import './Select.scss';

import {Field} from "../Field/Field";
import {ChangeEvent} from "react";
import {changeFilterType} from "../../../components/LaunchesPage/LaunchesPage";


export type SelectOptions = {
    id : string,
    name : string
}

export type SelectType = {
    id: filtersIdType,
    label : string,
    current : string,
    options : Array<SelectOptions>,
}

export type filtersIdType = 'launch_site' | 'rocket';

type SelectProps = {
    filter : SelectType,
    changeFilter : changeFilterType
}

export function Select({filter, changeFilter} : SelectProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) : void => {
        changeFilter(filter.id, 'current', e.target.value);
    };

    return <Field label={filter.label}>
        <select className={'select'} name={filter.id} onChange={handleChange}>
            <option value={'none'}>Все</option>
            {filter.options.map((item: SelectOptions) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
    </Field>
}