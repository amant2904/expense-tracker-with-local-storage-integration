function access_localstorage() {
    for (let i in localStorage) {
        if (i == "length") {
            break;
        }
        // access the data into the new obj
        let all_data = JSON.parse(localStorage.getItem(i));

        // creating table row
        let table_row = document.createElement("tr");

        // creating table data
        let td_1 = document.createElement("td");
        let td_2 = document.createElement("td");
        let td_3 = document.createElement("td");

        // append data in td's
        td_1.innerHTML = `&#8377 ${all_data.amount}`;
        td_2.textContent = all_data.descr;
        td_3.textContent = all_data.category;

        // create edit button
        let td_4 = document.createElement("td");
        let edit_btn = document.createElement("button");
        edit_btn.className = "btn btn-warning edit_btn"
        edit_btn.append(document.createTextNode("Edit"));
        td_4.append(edit_btn);

        // create delete btn
        let td_5 = document.createElement("td");
        let dlt_btn = document.createElement("button");
        dlt_btn.className = "btn btn-danger dlt_btn";
        dlt_btn.append(document.createTextNode("Delete"));
        td_5.append(dlt_btn);

        // append td's in table row
        table_row.append(td_1, td_2, td_3, td_4, td_5);

        // table row append in main table
        document.getElementById("main_table").append(table_row);
    }
}
access_localstorage();

document.getElementById("main_btn").addEventListener('click', (e) => {
    e.preventDefault();
    let obj = {
        amount: document.getElementById("amount").value,
        descr: document.getElementById("descr").value,
        category: document.getElementById("category").value
    }
    let len = localStorage.length;
    if (localStorage.getItem(obj.descr) == null) {
        localStorage.setItem(obj.descr, JSON.stringify(obj));
    }
    else {
        alert("Descript Already Exists");
    }
    document.getElementById("main_table").innerHTML = "";
    access_localstorage();
})



// working of edit and delete buttons
document.getElementById("main_table").addEventListener('click', (e) => {
    e.preventDefault();

    // working of ediit button
    if (e.target.classList.contains("edit_btn")) {
        let edit_data = JSON.parse(localStorage.getItem(e.target.parentElement.parentElement.children[1].textContent));
        document.getElementById("amount").value = edit_data.amount;
        document.getElementById("descr").value = edit_data.descr;
        document.getElementById("category").value = edit_data.category;
        localStorage.removeItem(edit_data.descr);
        e.target.parentElement.parentElement.remove();
    }

    // working of delete button
    if (e.target.classList.contains("dlt_btn")) {
        let dlt_data = e.target.parentElement.parentElement.children[1].textContent;
        localStorage.removeItem(dlt_data);
        e.target.parentElement.parentElement.remove();
    }
})


