const getData = async (url) => {
   return fetch(url)
        .then(res => {
            if(!res.ok){
                Promise.reject({
                    error: true,
                    status: res.status,
                    statusText: res.statusText
                }) 
            }
             
            return res.json()

        }).catch(error => console.log(error))

}


export { getData }