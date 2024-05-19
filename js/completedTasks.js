$(document).ready(function() {
    let userId = localStorage.getItem('sessionId'); // preluam IdUser din localStorage pentru a putea prelua taskurile din PHP
    if (!userId) {
        return;
    }
    $.ajax({
        url: "../php/completedTasks.php",
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



function generateTaskCards(tasks) {
    let container = $('#task-container');
    container.empty();
    for(let i = 0; i<tasks?.length ; i++)
    {
        const task = tasks[i];
        let card = `<div class="card" style="background: linear-gradient(to bottom, #ccffcc 0%, #43e743 100%)">
                    <div class="flex-column">
                        <div class="flex-row">
                            <div class="task-title">
                                <h2>${task.Title}</h2>
                            </div>
                            <div class="menu-container">
                                <div class="option-buttons">
                                <span class="material-symbols-outlined">
                                     check
                                </span>
                                </div>
                               
                            </div>
                        </div>
                        <div class="description-task">
                            <p class="desc">${task.Description}</p>
                        </div>
                        <div class="flex-row-buttons">
                            <div class="buttons">
                                <i class="fa fa-circle" style="font-size: 25px; color: #EF9F9F; ${task.Work !== '1' ? 'display: none;' : ''}"></i>
                                <i class="fa fa-circle" style="font-size: 25px; color: #FBF0B2; ${task.Entertainment !== '1' ? 'display: none;' : ''}"></i>
                                <i class="fa fa-circle" style="font-size: 25px; color: #CAEDFF; ${task.Study !== '1' ? 'display: none;' : ''}"></i>
                            </div>
                            <div class="checkbox">
                            <input type="checkbox" id="check" onclick="doneCheck(this)" data-task-id="${task.Id}"  ${task.Done !== '0' ? 'checked' : ''} ${task.Done !== '0' ? 'disabled' : ''}>
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