import router from "@/router";

export const setDefaultInterceptor = (Vue, includedPath = null) => {
    const interceptor = function (config) {
        if (includedPath !== null && config.url.includes(includedPath)) {
            let params = new URLSearchParams();
            params.append("metadata_fields", "modified");
            params.append("metadata_fields", "creators");
            params.append("metadata_fields", "start");
            params.append("metadata_fields", "excludeFromDisplay");
            config.params = params;
        }

        config.headers.Accept = "application/json";
        return config;
    };


    Vue.http.interceptors.request.use(interceptor);
};


export const setLoginInterceptor = (Vue) => {
    const token = Vue.ls.get("token", null);
    if (token !== null) {
        const interceptor = function (config) {
            config.headers.Authorization = 'bearer ' + token;
            return config;
        };


        Vue.http.interceptors.request.use(interceptor);
    }
};


export const setDefaultErrorCatcher = (Vue) => {
    Vue.http.interceptors.response.use((response) => {
        return response;
    }, function (error) {
        if (router.currentRoute.name === "home" && !error.config.url.includes('@workflow') && !error.config.url.includes('@breadcrumbs')) {
            router.app.$root.$bvToast.toast('Darauf konnte nicht zugegriffen werden. Entweder exisiert die Datei nicht, oder du hast kein Zugriffsrecht darauf. (Bist du angemeldet?)', {
                title: 'Fehler',
                autoHideDelay: 7000,
                variant: 'danger'
            });
        }
        router.replace('/')

    });
};
