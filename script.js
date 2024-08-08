export function login (event){
    event.preventDefault();
    const form = document.getElementById('formulariologin');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    window.location="index.html"

return false;
}