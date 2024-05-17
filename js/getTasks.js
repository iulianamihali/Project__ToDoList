$(document).ready(function() {

    let userId = localStorage.getItem('sessionId'); // preluam IdUser din localStorage pentru a putea prelua taskurile din PHP
    if (!userId) {
        console.error('UserId is not set in localStorage');
        return;
    }
    console.log(userId);
    $.ajax({
        url: "../php/getTasks.php",
        type: 'GET',
        data: {
            userId: userId
        },
        dataType: 'json',
        success: function(Data) {
            console.log('Tasks:', Data);
            // Aici poți actualiza interfața utilizatorului (UI) cu datele primite
            generateTaskCards(Data);

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});

function generateTaskCards(tasks) {
    let container = $('#task-container');
    container.empty(); // Golește containerul înainte de a adăuga noile carduri

    console.log(tasks);
    tasks.forEach(function(task) {
        let card = `
                <div class="card">
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
                                    <button id="edit-popup" onclick="edit()">Edit</button>
                                    <button id="delete-popup">Delete</button>
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
                            <input type="checkbox" id="check"  ${task.Done !== '0' ? 'checked' : ''} ${task.Done !== '0' ? 'disabled' : ''}>
                            </div>
                            <div class="text">
                                <p>Done</p>
                            </div>
                        </div>
                    </div>
                </div>`;

        container.append(card);
    });
}