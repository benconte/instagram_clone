import axios from "axios";

export async function create_PostEntry(data) {
    let form_data = new FormData();
    console.log("file is:",data.imageUrl)
    if (data.imageUrl) {
        form_data.append("imageUrl", data.imageUrl, data.imageUrl.name);
    }
    form_data.append("creator", data.creator)
    form_data.append("creator_id", data.creator_id)
    form_data.append("post", data.post)
    form_data.append("is_comments_allowed", data.is_comments_allowed)
    
    // for(let key of form_data.entries()) {
    //     console.log(key[0]+ ', ' + key[1])
    // }

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;

    const mymodel = await axios({
        url: "api/model/",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: form_data,
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return mymodel;
}

