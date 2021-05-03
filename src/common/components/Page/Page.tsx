import './Page.scss';
import React from "react";

type pageProps = {
    title : string,
    children ?: React.ReactNode
}

export function Page({title, children} : pageProps) {
    return <div className={'page'}>
        <div className="page__inside">
            <Header title={title}/>
            <div className={'main'}>
                {children}
            </div>
        </div>
    </div>
}

type headerProps = {
    title: string
}

function Header({title} : headerProps) {
    return <header className={'header'}>
        <h1 className="header__title">{title}</h1>
    </header>;
}