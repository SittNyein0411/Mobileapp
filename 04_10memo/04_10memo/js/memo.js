"use strict";
window.addEventListener("DOMContentLoaded", function () {

    if (typeof this.localStorage === "undefined") {
        Swal.fire({
            title: "Memo app",
            html: "このブラウザは LocalStorage をサポートしていません。",
            type: "error",
            allowOutsideClick: false
        });
        return;
    } else {
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        selectTable();
        allClearLocalStorage();
        iconDeleteLocalStorage();
    }

});


function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;


        if (key === "" || value === "") {
            Swal.fire({
                title: "Memo app",
                html: "Key、Memo はいずれも必須です。",
                type: "error",
                allowOutsideClick: false
            });
            return;
        }


        let w_msg = `LocalStorage に「${key}」「${value}」を保存しますか？`;

        Swal.fire({
            title: "Memo app",
            html: w_msg,
            type: "question",
            showCancelButton: true,
            allowOutsideClick: false
        }).then((result) => {

            if (result.value) {
                localStorage.setItem(key, value);
                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: `LocalStorage に「${key}」「${value}」を保存しました。`,
                    type: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });

    });
}

function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        list.appendChild(tr);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = `<img src="img/trash_icon.png" class="icon-del" data-key="${w_key}">`;

    }

    $("#table1").tablesorter({ sortList: [[1, 0]] });
    $("#table1").trigger("update");
}


function selectTable() {
    const select = document.getElementById("select");

    select.addEventListener("click", function (e) {
        e.preventDefault();
        selectCheckBox("select");
    });
}

function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            w_cnt++;
            if (w_cnt === 1) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
        }
    }

    if (mode === "select") {

        if (w_cnt === 0) {
            Swal.fire({
                title: "Memo app",
                html: "1つ選択してください。",
                type: "error",
                allowOutsideClick: false
            });
            return "0";
        }
        if (w_cnt > 1) {
            Swal.fire({
                title: "Memo app",
                html: "1つだけ選択してください。",
                type: "error",
                allowOutsideClick: false
            });
            return "0";
        }

        document.getElementById("textKey").value = w_textKey;
        document.getElementById("textMemo").value = w_textMemo;

        return "1";
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app",
                html: "1つ以上選択してください。",
                type: "error",
                allowOutsideClick: false
            });
            return "0";
        }
    }
}
function delLocalStorage() {
    const del = document.getElementById("del");

    del.addEventListener("click", function (e) {
        e.preventDefault();

        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        let w_cnt = selectCheckBox("del");
        if (w_cnt === "0") return;

        Swal.fire({
            title: "Memo app",
            html: `LocalStorage から選択されている ${w_cnt} 件を削除しますか？`,
            type: "warning",
            showCancelButton: true,
            allowOutsideClick: false
        }).then((result) => {

            if (result.value) {
                for (let i = 0; i < chkbox1.length; i++) {
                    if (chkbox1[i].checked) {
                        let key = table1.rows[i + 1].cells[1].firstChild.data;
                        localStorage.removeItem(key);
                    }
                }

                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: `LocalStorage から ${w_cnt} 件削除しました。`,
                    type: "success",
                    allowOutsideClick: false
                });
            }

        });

    });
}
function allClearLocalStorage() {
    const allclear = document.getElementById("allClear");

    allclear.addEventListener("click", function (e) {
        e.preventDefault();

        Swal.fire({
            title: "Memo app",
            html: "LocalStorage のデータをすべて削除します。<br>よろしいですか？",
            type: "warning",
            showCancelButton: true,
            allowOutsideClick: false
        }).then((result) => {

            if (result.value) {
                localStorage.clear();
                viewStorage();

                Swal.fire({
                    title: "Memo app",
                    html: "LocalStorage のデータをすべて削除しました。",
                    type: "success",
                    allowOutsideClick: false
                });

                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }

        });

    });
}
function iconDeleteLocalStorage() {
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", function (e) {
        if (e.target.classList.contains("icon-del")) {
            const key = e.target.dataset.key;
            const tr = e.target.closest("tr");
            const memo = tr.cells[2].textContent;

            Swal.fire({
                title: "Memo app",
                html: `LocalStorage から「${key}」「${memo}」削除しますか？`,
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "削除",
                cancelButtonText: "キャンセル",
                allowOutsideClick: false
            }).then((result) => {
                if (result.value) {
                    localStorage.removeItem(key);
                    viewStorage();
                    Swal.fire({
                        title: "Memo app",
                        html: `LocalStorage から「${key}」「${memo}」を削除しました。`,
                        type: "success",
                        allowOutsideClick: false
                    });
                }
            });
        }
    });
}


