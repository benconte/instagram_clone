import axios from "axios";

export async function create_PostEntry(data) {
    let form_data = new FormData();
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

    const user = await axios({
        url: `api/user/${mymodel.data.user_id}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    mymodel.data["user"] = user.data
    return mymodel;
}

// create post comment
export async function create_PostCommentEntry(data) {
    let formData = new FormData()

    formData.append("post_id", data.post_id)
    formData.append("comment", data.comment)

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;

    const comment = await axios({
        url: `/api/createPostComment/${data.post_id}`,
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formData,
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return comment;
}

