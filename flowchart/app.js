var totalgp = 0;
var totalunit = 0;
var cumgpa = 0;
var degreeprogress = totalunit/180 * 100;

function deselectClass(cell) {
    var currentCourse = cell.dataset.course;
    var cells = document.querySelectorAll('td[data-course="' + currentCourse + '"]');
  
    // Restore the original background color of the cells
    for (var i = 0; i < cells.length; i++) {
      cells[i].classList.remove("completed");
      cells[i].style.backgroundColor = blankColor;
    }
  
    // Update the cumulative GPA and total units
    var unitCount = parseFloat(document.getElementById("unitCount").value);
    var grade = document.getElementById("grade").value;
    var gradePoint = convertToGradePoint(grade);
    totalgp -= unitCount * gradePoint;
    totalunit -= unitCount;
    cumgpa = totalunit !== 0 ? totalgp / totalunit : 0;
  
    updateCumulativeGPA();
    updateTotalUnit();
    updateDegreeProgress();
  }
  

function openModal(cell) {
  // Display the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Set the clicked cell as the current course
  var currentCourse = cell.dataset.course;
  modal.dataset.currentCourse = currentCourse;
}

function closeModal() {
  // Hide the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function cancelChanges() {
  closeModal();
}

function applyChanges(event) {
  event.preventDefault();

  // Get the entered data
  var unitCount = document.getElementById("unitCount").value;
  var grade = document.getElementById("grade").value;

  // Convert letter grade to grade point
  var gradePoint = convertToGradePoint(grade);

  // Update the course status
  var currentCourse = document.getElementById("myModal").dataset.currentCourse;
  var cells = document.querySelectorAll('td[data-course="' + currentCourse + '"]');
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.add("completed");
  }

  // Update cumulative GPA
  totalgp += parseFloat(unitCount) * gradePoint;
  totalunit += parseFloat(unitCount);
  degreeprogress = totalunit/180 * 100;
  cumgpa = totalunit !== 0 ? totalgp / totalunit : 0;

  closeModal();
  updateCumulativeGPA();
  updateTotalUnit(); // Update totalUnit value in the HTML
  updateDegreeProgress();
}

window.addEventListener("load", function () {
  var form = document.getElementById("courseForm");
  form.addEventListener("submit", applyChanges);

  var closeButton = document.getElementsByClassName("close")[0];
  closeButton.addEventListener("click", closeModal);

  var cancelButton = document.querySelector("#courseForm button[type='button']");
  cancelButton.addEventListener("click", cancelChanges);
});

var deselectButton = document.getElementById("deselect");
deselectButton.addEventListener("click", function () {
  var currentCourse = document.getElementById("myModal").dataset.currentCourse;
  var cells = document.querySelectorAll('td[data-course="' + currentCourse + '"]');
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove("completed");
  }

  deselectClass(cells[0]); // Assuming the first cell is used as a reference

  updateCumulativeGPA();
  updateTotalUnit();
  updateDegreeProgress();
});


function updateCumulativeGPA() {
  var cumulativeGPAElement = document.getElementById("cumulativeGPA");
  cumulativeGPAElement.textContent = calculateGPA();
}

function updateTotalUnit() {
  var totalUnitElement = document.getElementById("totalunit");
  totalUnitElement.textContent = totalunit;
}

function updateDegreeProgress() {
    var degreeProgressElement = document.getElementById("degreeprogress");
    degreeProgressElement.textContent = degreeprogress.toFixed(2);
}

function convertToGradePoint(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.3;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}

function calculateGPA() {
  return cumgpa.toFixed(2); // Adjust the number of decimal places as needed
}`   `