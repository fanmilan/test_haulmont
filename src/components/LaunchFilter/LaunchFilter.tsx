import './LaunchFilter.scss';

import {Select, SelectType} from "../../common/components/Select/Select";
import {changeFilterType} from "../LaunchesPage/LaunchesPage";

type LaunchFilterProps = {
    filters: Array<SelectType>,
    changeFilter: changeFilterType
}

export function LaunchFilter({filters, changeFilter} : LaunchFilterProps) {

    return <div className={'filter'}>
        {
            filters.map((item,index) => <Select
                key={index}
                filter={item}
                changeFilter={changeFilter}
            />)
        }
    </div>
}