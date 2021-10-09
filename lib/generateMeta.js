const secondaryColor = '#cc208e'


const generateHeadTags = (pageTitle, description, thumbnail, path, generateSocial) => {
    let origin = `https://oneweekinhawaii.com`

    if (process.client)
        origin = window.origin

    return {
        title: `${pageTitle} | Nuxt Vuetify PAW Optimized`,
        meta: generateSocial ? [
            { charset: 'utf-8' },
            { name: 'robots', content: 'noindex' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'theme-color', content: secondaryColor },
            {
                hid: `description`,
                name: `description`,
                content: description,
            },
            { property: `og:type`, content: `website` },
            { property: `og:title`, content: `${pageTitle}` },
            {
                property: `og:description`,
                content: description,
            },
            {
                property: `og:image`,
                content: `${origin}/thumbnails/thumbnail_${thumbnail}.png`,
            },
            {
                property: `og:url`,
                content: `${origin}/${path ? path : ''}`,
            },
            {
                property: `twitter:card`,
                content: `summary_large_image`,
            },
            {
                property: `twitter:url`,
                content: `${origin}/${path ? path : ''}`,
            },
            {
                property: `twitter:title`,
                content: `${pageTitle} | PAGE_TITLE`,
            },
            {
                property: `twitter:description`,
                content: description,
            },
            {
                property: `twitter:image`,
                content: `${origin}/thumbnails/thumbnail_${thumbnail}.png`,
            },
        ]
            :
            [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: secondaryColor },
                {
                    hid: `description`,
                    name: `description`,
                    content: description,
                },
                { property: `og:type`, content: `website` },
                { property: `og:title`, content: `${pageTitle}` },
                {
                    property: `og:description`,
                    content: description,
                },

                {
                    property: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    property: `twitter:title`,
                    content: `${pageTitle} | PAGE_TITLE`,
                },
                {
                    property: `twitter:description`,
                    content: description,
                },

            ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap' },
        ]
    }
}

export default generateHeadTags