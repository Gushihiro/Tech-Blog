const newEntryForm = document.querySelector("#newEntryForm");
const delBtns = document.querySelectorAll(".entryDelBtn");


newEntryForm.addEventListener("submit", e => {
    e.preventDefault();
    const formObj = {
        title: document.querySelector("#newEntryName").value,
        content: document.querySelector("#newEntryDescription").value,
    }

    fetch("/api/entry", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(!res.ok) {
            alert("failed to create project")
            console.log(err);
        } else {
            alert("yay new project")

        }
        location.reload();
    })
    console.log(formObj)
});

delBtns.forEach(button=> {
    button.addEventListener("click", () => {
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/entry/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
        if(!res.ok) {
            alert("No project to delete")
        } else {
            alert("Congrats you played yaself")
        }
        location.reload();
        })
    })
})