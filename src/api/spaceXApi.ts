import {LaunchItemType} from "../components/LaunchItem/LaunchItem";

const url:string = "https://api.spacexdata.com/v3/launches";

type resGetLaunchesType = {
    links : {
        mission_patch_small ?: string
    },
    mission_name: string,
    launch_date_unix: number,
    details?:string,
    rocket:{
        rocket_id : string,
        rocket_name: string
    },
    launch_site:{
        site_id : string,
        site_name: string
    }
}

export function getLaunches() : Promise<Array<LaunchItemType>> {
    return fetch(url)
        .then((response: Response) => {
            return response.json();
        }).then((res: Array<resGetLaunchesType>) => {
            return res.map((item : resGetLaunchesType) => ({
                image: item.links.mission_patch_small,
                title: item.mission_name,
                date: new Date(item.launch_date_unix * 1000).toLocaleString('ru', {
                    day: '2-digit', month: '2-digit', year: 'numeric'
                }),
                description: item.details || 'Upcoming',
                rocket: {
                    id: item.rocket.rocket_id,
                    name: item.rocket.rocket_name
                },
                launch_site: {
                    id: item.launch_site.site_id,
                    name: item.launch_site.site_name
                }
            })
            );
        });
}

