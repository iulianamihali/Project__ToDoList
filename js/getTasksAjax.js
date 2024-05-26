$(document).ready(function() {
    let userId = localStorage.getItem('sessionId'); // preluam IdUser din localStorage pentru a putea prelua taskurile din PHP
    if (!userId) {
        return;
    }
    $.ajax({
        url: "../php/getTasks.php",
        type: 'GET',
        data: {
            userId: userId
        },
        dataType: 'json',
        success: function(response) {
            generateTaskCards(response);

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});

function edit(card)
{
    let modal = document.getElementById("myModalEdit");
    let close = document.getElementById("closeEdit");
    let save = document.getElementById("editTaskSave");

    // take from card
    const taskId = card.getAttribute('data-task-id');
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    const work = card.getAttribute('data-work');
    const entertainment = card.getAttribute('data-entertainment');
    const study = card.getAttribute('data-study');


    let modalHeader = document.getElementById("modalHeaderEdit");
    let modalBody = document.getElementById("textarea1Edit");
    let modalCheck1 = document.getElementById("checkBut1Edit");
    let modalCheck2 = document.getElementById("checkBut2Edit");
    let modalCheck3 = document.getElementById("checkBut3Edit");

    // put the data in modal edit
    modalHeader.value = title;  // Set the title
    modalBody.textContent = description;
    modalCheck1.checked = work === '1';
    modalCheck2.checked = entertainment === '1';
    modalCheck3.checked = study === '1';
    // ad new attribute
    save.setAttribute('data-task-id', taskId);

    modal.style.display = "block";
    close.onclick = function() {
        modal.style.display = "none";
    }

}

function doneCheck(checkButton)
{
    const taskId = checkButton.getAttribute('data-task-id');
    const data = {
        Id:taskId
    }
    $.ajax({
        url: '../php/buttonDone.php',
        type: 'POST',
        data: data,
        success: function(response) {
            console.log('Marked done!', response);

            $('#myModal').hide();
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error marked Done', error);
        }
    });

}
function generateTaskCards(tasks) {
    let container = $('#task-container');
    container.empty();
    const orderTasks = tasks.sort((a, b) => Number(a.Done) - Number(b.Done));
    for(let i = 0; i<orderTasks?.length ; i++)
    {
        const task = tasks[i];
        console.log(task);
        let card = `<div class="card">
                    <div class="flex-column">
                        <div class="flex-row">
                            <div class="task-title">
                                <h2>${task.Title}</h2>
                            </div>
                            <div class="menu-container">
                                <div class="option-buttons">
                                    <i class='bx bx-dots-horizontal-rounded'></i>
                                </div>
                                <div class="menu-options">
                                <button class="edit-popup" onclick="edit(this)" data-task-id="${task.Id}" data-title="${task.Title}" data-description="${task.Description}" data-work="${task.Work}" data-entertainment="${task.Entertainment}" data-study="${task.Study}" data-done="${task.Done}">Edit</button>
                                    <button class="delete-popup"  data-task-id="${task.Id}">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div class="description-task">
                            <p class="desc">${task.Description}</p>
                        </div>
                        <div class="flex-row-buttons">
                            <div class="buttons">
                                <i class="fa fa-circle" style="font-size: 25px; color: #EF9F9F; ${task.Work !== 1 ? 'display: none;' : null}"></i>
                                <i class="fa fa-circle" style="font-size: 25px; color: #FBF0B2; ${task.Entertainment !== 1 ? 'display: none;' : null}"></i>
                                <i class="fa fa-circle" style="font-size: 25px; color: #CAEDFF; ${task.Study !== 1 ? 'display: none;' : null}"></i>
                            </div>
                            <div class="checkbox">
                            <input type="checkbox" id="check" onclick="doneCheck(this)" data-task-id="${task.Id}"  ${task.Done !== 0 ? 'checked' : null} ${task.Done !== 0 ? 'disabled' : null}>
                            </div>
                            <div class="text">
                                <p>Done</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        container.append(card);
    }
}