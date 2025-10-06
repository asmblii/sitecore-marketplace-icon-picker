workspace "Site Icon Picker" "Model context" {

    !identifiers hierarchical

    model {
        archetypes {
            xmc = container {
                tag "Sitecore XM Cloud"
            }
            mp = container {
                tag "Sitecore Marketplace"
            }
        }

        u = person "Editor"
        ss = softwareSystem "Software System" {
            xmc = xmc "XM Cloud"
            web = container "Head application"
            app = mp "Site Icon Picker" 
        }

        u -> ss.xmc "Uses"
        ss.xmc -> ss.web "Embed site"
        ss.xmc -> ss.app "Open app"
        ss.app -> ss.web "Fetch available icons"
    }

    views {
        container ss "containers" "Containers" {
            include *
            autolayout lr
        }

        styles {
            element "Element" {
                color black
                metadata false
            }

            element "Container" {
                background white
                stroke red
                strokeWidth 2
            }

            element "Person" {
                shape person
                metadata false
                color black
            }

            theme ./theme.json
        }

        properties {
            "structurizr.locale" "en-GB"
            "structurizr.metadata" false
            "structurizr.title" false
        }
    }

    configuration {
        scope softwaresystem
    }
}