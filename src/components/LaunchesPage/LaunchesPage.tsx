import './LaunchesPage.scss';

import {Page} from '../../common/components/Page/Page';
import {LaunchItem, LaunchItemType} from "../LaunchItem/LaunchItem";
import {useEffect, useState} from "react";
import {getLaunches} from "../../api/spaceXApi";
import {LaunchFilter} from "../LaunchFilter/LaunchFilter";
import {filtersIdType, SelectOptions, SelectType} from "../../common/components/Select/Select";
import {Loader} from "../../common/components/Loader/Loader";


export type changeFilterType = (name: string, field: 'current' | 'options', value: string | Array<SelectOptions>) => void;

export function LaunchesPage() {

    const defaultFilters: Array<SelectType> = [
        {
            id: 'launch_site',
            label: 'Launch Site',
            current: 'none',
            options: [],
        },
        {
            id: 'rocket',
            label: 'Rocket',
            current: 'none',
            options: []
        }
    ];
    const [launches, setLaunches] = useState<Array<LaunchItemType>>([]);
    const [filters, setFilters] = useState<Array<SelectType>>(defaultFilters);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        getLaunches()
            .then((res) => {
                setLaunches(res);
                getOptions(res);
            }).catch((err) => {
                console.log(err);
                alert('Произошла ошибка.');
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);


    const getOptions = (arr: Array<LaunchItemType>): void => {

        type uniqueHelperType = Record<filtersIdType, {
            keys: Set<Object>,
            result: Array<SelectOptions>
        }>;


        const fields: Array<filtersIdType> = filters.map((filter) => filter.id);

        const uniqueHelper: uniqueHelperType = {} as uniqueHelperType;

        for (let field of fields) {
            uniqueHelper[field] = {
                keys: new Set(),
                result: []
            }
        }

        arr.forEach((item: LaunchItemType) => {
            for (let field of fields) {
                const id: string = item[field].id;
                if (!uniqueHelper[field].keys.has(id)) {
                    uniqueHelper[field].keys.add(id);
                    uniqueHelper[field].result.push(item[field]);
                }
            }
        });

        for (let field of fields) {
            changeFilter(field, 'options', uniqueHelper[field].result)
        }

    }


    const changeFilter: changeFilterType = (name: string, field: 'current' | 'options', value: string | Array<SelectOptions>): void => {
        const newFilters: Array<SelectType> = [...filters];
        let index: number = newFilters.findIndex((item: SelectType) => item.id === name);

        if (field === 'current' && typeof value === 'string') {
            newFilters[index][field] = value;
        }

        if (field === 'options' && Array.isArray(value)) {
            newFilters[index][field] = value;
        }

        setFilters(newFilters);
    }


    return <Page title={'Launches'}>
        {
            isLoading ? <Loader /> :
                <>
                    <LaunchFilter filters={filters} changeFilter={changeFilter}/>
                    <LaunchItems items={launches} filters={filters.filter(item => item.current !== 'none')}/>
                </>
        }

    </Page>
}


type FilterType = {
    id: filtersIdType,
    current: string
}

type LaunchItemsProps = {
    items: Array<LaunchItemType>,
    filters: Array<FilterType>
}

function LaunchItems({items, filters}: LaunchItemsProps) {

    function getLaunches() {
        if (filters.length > 0) {
            return items.filter((item) => {
                let check = true;
                for (let filter of filters) {
                    if (item[filter.id].id !== filter.current) {
                        check = false;
                        break;
                    }
                }
                return check;
            });
        }
        return items;
    }

    let launches = getLaunches();

    return <div className={'launches'}>
        {
            (launches.length > 0) ? launches.map((item, index) => <LaunchItem key={index} item={item}/>) : <EmptyResult />
        }
    </div>
}

function EmptyResult() {
    return <div className={'empty-result'}>Ничего не найдено</div>;
}
