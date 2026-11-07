// Set "completed" to true for each course you have finished.
const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, certificate: "Web and Computer Programming", technology: ["Python"], completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", technology: ["HTML", "CSS"], completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, certificate: "Web and Computer Programming", technology: ["Python"], completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, certificate: "Web and Computer Programming", technology: ["C#"], completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", technology: ["HTML", "CSS", "JavaScript"], completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, certificate: "Web and Computer Programming", technology: ["HTML", "CSS", "JavaScript"], completed: false }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filters button");

function displayCourses(list) {
  courseList.innerHTML = "";

  list.forEach(course => {
    const li = document.createElement("li");
    li.classList.add("course-card", course.completed ? "completed" : "not-completed");

    const label = document.createElement("span");
    label.textContent = `${course.subject} ${course.number}`;
    label.title = course.title;

    const status = document.createElement("span");
    status.classList.add("status");
    status.textContent = course.completed ? "✓ Completed" : "In progress / to do";

    li.append(label, status);
    courseList.appendChild(li);
  });

  // Total credits for only the courses currently displayed
  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = total;
}

function filterCourses(filter) {
  if (filter === "all") return courses;
  return courses.filter(course => course.subject === filter);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    displayCourses(filterCourses(button.dataset.filter));
  });
});

displayCourses(courses);
