document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const form = document.getElementById("checkInForm");
  const nameInput = document.getElementById("attendeeName");
  const teamSelect = document.getElementById("teamSelect");
  const greeting = document.getElementById("greeting");
  const progressBar = document.getElementById("progressBar");
  const attendeeCountDisplay = document.getElementById("attendeeCount");

  const waterList = document.getElementById("waterList");
  const zeroList = document.getElementById("zeroList");
  const powerList = document.getElementById("powerList");

  const resetLink = document.getElementById("resetDataLink");

  const maxCount = 50;
  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
  let count = attendees.length;

  // Render attendees grouped by team
  // Render attendees as <p> elements
function renderAttendees() {
  waterList.innerHTML = "";
  zeroList.innerHTML = "";
  powerList.innerHTML = "";

  attendees.forEach(person => {
    const p = document.createElement("p");
    p.textContent = person.name;
    p.classList.add("attendee-name");

    switch (person.team) {
      case "water":
        p.classList.add("water-style");
        waterList.appendChild(p);
        break;

      case "zero":
        p.classList.add("zero-style");
        zeroList.appendChild(p);
        break;

      case "power":
        p.classList.add("power-style");
        powerList.appendChild(p);
        break;
    }
  });
}

  // Update counts and progress bar
  function updateCounts() {
    const percentage = Math.round((count / maxCount) * 100);

    attendeeCountDisplay.textContent = percentage + "%";
    progressBar.style.width = percentage + "%";

    const waterCount = attendees.filter(a => a.team === "water").length;
    const zeroCount = attendees.filter(a => a.team === "zero").length;
    const powerCount = attendees.filter(a => a.team === "power").length;

    document.getElementById("waterCount").textContent = waterCount;
    document.getElementById("zeroCount").textContent = zeroCount;
    document.getElementById("powerCount").textContent = powerCount;
  }

  // Confetti animation
  function launchConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#0071c5", "#00aeef", "#34d399", "#f97316", "#ef4444"];

    for (let i = 0; i < 120; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      confetti.style.width = size + "px";
      confetti.style.height = size * 1.5 + "px";
      confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    if (!name || !team) return;

    if (count >= maxCount) {
      greeting.textContent = "Event is at full capacity!";
      greeting.classList.add("success-message");
      greeting.style.display = "block";
      return;
    }

    const attendee = { name, team };
    attendees.push(attendee);
    localStorage.setItem("attendees", JSON.stringify(attendees));

    count++;
    renderAttendees();{
         waterList.innerHTML = "";
         zeroList.innerHTML = "";
         powerList.innerHTML = ""; 

         attendees.forEach(person => {
            const p = document.createElement("p");
            p.textContent = person.name;
            p.classList.add("attendee-name"); // optional class for styling

            switch (person.team) {
                case "water":
                    p.style.backgroundColor = "rgba(0, 113, 197, 0.1)";
                    p.style.color = "#0071c5";
                    waterList.appendChild(p);
                    break;
                    case "zero":
                        p.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
                        p.style.color = "#10b981";
                        zeroList.appendChild(p);
                        break;
                     case "power":
                         p.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
                         p.style.color = "#d97706";
                         powerList.appendChild(p);
                         break;
            }
        });
    }

    updateCounts();

    greeting.textContent = `🎉 Welcome, ${name} from ${teamName}`;
    greeting.classList.add("success-message");
    greeting.style.display = "block";

    launchConfetti();

    setTimeout(() => (greeting.style.display = "none"), 5000);

    form.reset();
  });

  // Reset all data
  resetLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (!confirm("Are you sure you want to reset all attendance data?")) return;

    localStorage.removeItem("attendees");
    location.reload();
  });

  // Initial render
  renderAttendees();
  updateCounts();
});