
const baseURL = "https://ecomerceapis.runasp.net/api/";

async function callAPI(url, method= "GET", data = undefined){

    let token = localStorage.getItem("token");
    let res = await fetch(baseURL + url, {
        method: method,
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    });
    return res;
}

async function callAPIFormData(url, method= "GET", data = undefined){

    let token = localStorage.getItem("token");

    let res = await fetch(baseURL+url,{
        method: method,
        headers:{
            // "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
        },
        body: data
    });

    return res;
}
 const imgBaseUrl = "https://ecomerceapis.runasp.net/";
 function showToast(message, isSuccess = true) {
    const toastContainer = document.getElementById("toastContainer");

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-bg-${isSuccess ? "success" : "danger"} border-0 show`;
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    // Append toast to container
    toastContainer.appendChild(toast);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}


export {callAPI}
export {callAPIFormData}
export {showToast}

