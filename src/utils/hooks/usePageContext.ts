import { useEffect, useState } from "react";
import { type ClientSDK, type PagesContext } from "@sitecore-marketplace-sdk/client";

export function usePageContext(client: ClientSDK) {
    const [pageContext, setPageContext] = useState<PagesContext>()

    useEffect(() => {
        console.log('Start query');
        client.query("pages.context", {
            subscribe: true,
            onSuccess: data => {
                setPageContext(data)
            },
            onError: err => console.warn(err),
        });
    }, [client]);

    return [pageContext];
}