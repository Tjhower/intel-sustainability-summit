// Get  all needed DOM elements
const form = document.getElementById("checkInForm")
const nameInput = document.getElementById("attendeeName")
const teamSelect = document.getElementById("teamSelect")
const progressBar = document.getElementById("progressBar");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50;

// Load saved data on page load
window.addEventListener("DOMContentLoaded",() => {
    // Load total count
    const savedCount = localStorage.getItem("totalCount");
    if (savedCount !== null){
        count = parseInt(savedCount);
        attendeeCountDisplay.textContent = count;

        const percentage = Math.round((count / maxCount) * 100) + "%";
        progressBar.style.width = percentage;
    }
    // Load team counts
    ["water", "zero", "power"].forEach(team => {
        const savedTeamCount = localStorage.getItem(team + "Count");
        if (savedTeamCount !== null) {
            document.getElementById(team + "Count").textContent = savedTeamCount;
    }
    });
});

// Stored as one object
const data = {
    total: count,
    water: document.getElementById("waterCount").textContent,
    zero: document.getElementById("zeroCount").textContent,
    power: document.getElementById("powerCount").textContent
};

localStorage.setItem("attendanceData", JSON.stringify(data));

// * Reset all data
function resetAllData(){
    localStorage.removeItem("totalCount");
    localStorage.removeItem("waterCount");
    localStorage.removeItem("zeroCount");
    localStorage.removeItem("powerCount");
    location.reload();
}

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get from Values
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions [0].text;

    console.log(name, teamName);

    if (!name || !team) return;

    // Prevent exeeding max
    if (count >= maxCount){
        greeting.textContent = "Event is at full capacity!"
        greeting.classList.add("success-message");
        greeting.style.display = "block";
        return;
    }

    // Increment count
    count++
    console.log("Total check-ins:", count);

    // Update attendee number display
    attendeeCountDisplay.textContent = count;

    // Calculate and update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    progressBar.style.width = percentage;
    console.log(`Progress: ${percentage}`);

    if (percentage > 80) {
        progressBar.style.background = "linear-gradient(90deg, #00c6fdd6, #00c7fd)";
    }

    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    // Save total count
    localStorage.setItem("totalCount", count);

    // Save team count
    localStorage.setItem(team + "Cont", teamCounter.textContent);

    // Show welcome message
    greeting.textContent = `🎉Welcome, ${name} from ${teamName}`;
    greeting.classList.add("success-message");
    greeting.style.display = "block";
    console.log(greeting)
    
    // Launch confetti
    launchConfetti();

    // Auto-hide greeting after 3 seconds
    setTimeout(() => {
        greeting.style.display = "none";
    }, 5000);

    form.reset();
});

// Confetti
function launchConfetti() {
    const container = document.getElementById("confetti-container")

    if(!container) return; //safety check

    const colors = ["#0071c5", "#00aeef", "#34d399", "#f97316", "#ef4444"]
    const confettiCount = 120; 
    
    for(let i =0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Random horizontal position
        confetti.style.left = Math.random() * 100 + "vw";

        // Random color
        confetti.style.backgroundColor = 
        colors[Math.floor(Math.random() * colors.length)];

        // Random fall duration
        const size = Math.random() * 8 + 4;
        confetti.style.width = size + "px";
        confetti.style.height = size * 1.5 + "px";
        confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

        container.appendChild(confetti);

        // Clear after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
console.log("Confetti launched!");
        }
    }
// Reset Data "Button"
const resetLink = document.getElementById("resetDataLink");

if (resetLink) {
    resetLink.addEventListener("click", function (e) {
        e.preventDefault(); // stop page jump

        const confirmReset = confirm("Are you sure you want to reset all attendance data?");
        if (!confirmReset) return;

        localStorage.clear();
        location.reload();
    });
}