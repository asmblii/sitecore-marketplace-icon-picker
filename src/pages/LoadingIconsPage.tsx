import { useEffect, useState } from "react";
import type { ClientSDK, PagesContext, PagesContextSiteInfo } from "@sitecore-marketplace-sdk/client";
import { usePageContext } from "@/utils/hooks/usePageContext";
import type { Icon } from "@/types";

export type LoadingIconsPageProps = {
    client: ClientSDK,
    setIcons: (icons: Array<Icon>) => void;
}

interface ExtendedSiteInfo extends PagesContextSiteInfo {
    renderingEngineApplicationUrl: string;
}

function getRenderingUrl(pagesContext: PagesContext) {

    const siteInfo = pagesContext.siteInfo as ExtendedSiteInfo;
    let renderingUrl: string = siteInfo.renderingEngineApplicationUrl;
    if (renderingUrl[renderingUrl.length - 1] == '/') {
        renderingUrl = renderingUrl.substring(0, renderingUrl.length - 1);
    }

    // renderingUrl = 'https://localhost:5000';
    
    renderingUrl += `?site=${siteInfo.name}&template=${pagesContext.pageInfo?.template.name}`;
    
    return renderingUrl;
}

type IconsData = {
    stylesheet: string;
    icons: Array<Icon>;
}

export function LoadingIconsPage({ client, setIcons }: LoadingIconsPageProps) {
    const [pagesContext] = usePageContext(client);
    const [stateMessage, setStateMessage] = useState<string>('Initializing...');

    useEffect(() => {
        if (!pagesContext) {
            setStateMessage('Waiting for initialization...');
            return;
        }

        const renderingUrl = getRenderingUrl(pagesContext);

        setStateMessage('Context available, start requesting icons...')
        fetch(`${renderingUrl}/api/xmc-icons`)
            .then(response => response.json())
            .then((data: IconsData) => {
                const tag = document.createElement('link');
                tag.setAttribute('href', `${renderingUrl}/${data.stylesheet}`);
                tag.setAttribute('rel', 'stylesheet');
                document.head.appendChild(tag);

                setIcons(data.icons);
            });
    }, [pagesContext, setIcons]);

    return (<div>{stateMessage}</div>);
}
