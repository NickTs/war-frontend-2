export const backendBaseURL = "https://www.worldart.ml/b"

export const GetBaseUrl = () => {
    return window.location.protocol + "//"
        + window.location.hostname
        + (window.location.port ? ':' + window.location.port : '')
}

export const GetRequestParam = (paramName) => {
    return window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(
            function (p, e) {
                var a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        )[paramName]
}

export const GetElementById= (arr, id) => {
    if(arr && arr.length>0){
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id) return arr[i]
        }
    }
    return undefined
}

export const GetElementByHref= (arr, href) => {
    if(arr && arr.length>0){
        for(var i=0;i<arr.length;i++){
            if(arr[i].href==href) return arr[i]
        }
    }
    return undefined
}