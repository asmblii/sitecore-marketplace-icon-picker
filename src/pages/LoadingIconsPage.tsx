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

function getRenderingHostUrl(pagesContext: PagesContext) {

    const siteInfo = pagesContext.siteInfo as ExtendedSiteInfo;
    let renderingUrl: string = siteInfo.renderingEngineApplicationUrl;
    if (renderingUrl[renderingUrl.length - 1] == '/') {
        renderingUrl = renderingUrl.substring(0, renderingUrl.length - 1);
    }

    return renderingUrl.split('?', 2);
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

        const [renderingHostUrl, query] = getRenderingHostUrl(pagesContext);
        const url = `${renderingHostUrl}/api/xmc-icons?site=${pagesContext.siteInfo?.name}&template=${pagesContext.pageInfo?.template.name}&${query ?? ''}`;

        setStateMessage('Context available, start requesting icons...')
        fetch(url)
            .then(response => response.json())
            .then((data: IconsData) => {
                const tag = document.createElement('link');
                tag.setAttribute('href', `${renderingHostUrl}/${data.stylesheet}`);
                tag.setAttribute('rel', 'stylesheet');
                document.head.appendChild(tag);

                setIcons(data.icons);
            });
    }, [pagesContext, setIcons]);

    return (<div>{stateMessage}</div>);
}
