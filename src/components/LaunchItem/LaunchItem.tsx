import './LaunchItem.scss';


export type LaunchItemType = {
    image?: string,
    title: string,
    date: string,
    description: string,
    rocket : LaunchItemFilterType,
    launch_site: LaunchItemFilterType
}

type LaunchItemFilterType = {
    id : string,
    name : string
}

type LaunchItemProps = {
    item : LaunchItemType
}


export function LaunchItem({item}: LaunchItemProps) {
    return <article className={'launch-item'}>
        <div className="launch-item__image">
            {
                item.image && <img src={item.image} alt={'Изображение нашивки'}/>
            }

        </div>
        <div className="launch-item__content">
            <div className="launch-item__header">
                <h2 className="launch-item__title">{item.title}</h2>
                <div className="launch-item__date">{item.date}</div>
            </div>
            <div className="launch-item__description">
                {item.description}
            </div>
        </div>
    </article>
}