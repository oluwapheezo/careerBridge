
// CareerBridge Admin Dashboard

const viewButtons = document.querySelectorAll(".view-btn");

const candidateModal = document.getElementById("candidate-modal");
const closeModal = document.getElementById("candidate-modal-close");

const candidateName = document.getElementById("candidate-name");
const candidatePosition = document.getElementById("candidate-position");
const candidateDate = document.getElementById("candidate-date");
const candidateCV = document.getElementById("candidate-cv");
const candidateStatusSelect = document.getElementById("candidate-status-select");

const defaultCandidates = [
    {
        name: "Alex Morgan",
        position: "Frontend Developer",
        date: "November 9, 2026",
        status: "Pending"
    },
    {
        name: "Jordan Lee",
        position: "UI/UX Designer",
        date: "November 8, 2026",
        status: "Shortlisted"
    },
    {
        name: "Sam Taylor",
        position: "Customer Support",
        date: "November 7, 2026",
        status: "Rejected"
    }
];

// Open candidate details
// VIEW CANDIDATE DETAILS

const applicationTable = document.querySelector(
    ".applications-table tbody"
);

applicationTable.addEventListener("click", function (event) {
    const viewButton = event.target.closest(".view-btn");

    if (!viewButton) return;

    const row = viewButton.closest("tr");
    const name = row.cells[0].textContent.trim();

    const candidate = candidates.find(
        item => item.name === name
    );

    if (!candidate) return;

    candidateName.textContent = candidate.name;
    candidatePosition.textContent = candidate.position;
    candidateDate.textContent = candidate.date;

// DISPLAY CANDIDATE CV
candidateCV.innerHTML = "";

if (candidate.cvData) {
    const previewLink = document.createElement("a");
    const downloadLink = document.createElement("a");

    const isPDF = candidate.cvName.toLowerCase().endsWith(".pdf");

    if (isPDF) {
        const parts = candidate.cvData.split(",");
        const mimeType = parts[0].match(/:(.*?);/)[1];
        const binary = atob(parts[1]);

        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        const cvBlob = new Blob([bytes], { type: mimeType });
        const cvURL = URL.createObjectURL(cvBlob);

        previewLink.href = cvURL;
        previewLink.target = "_blank";
        previewLink.rel = "noopener noreferrer";
        previewLink.textContent = "Preview CV";
    } else {
        previewLink.textContent = "Preview unavailable for Word documents";
    }

    downloadLink.href = candidate.cvData;
    downloadLink.textContent = "Download CV";
    downloadLink.download = candidate.cvName;

    candidateCV.appendChild(previewLink);
    candidateCV.appendChild(document.createTextNode(" | "));
    candidateCV.appendChild(downloadLink);

} else {
    candidateCV.textContent = "No CV uploaded";
}
    candidateModal.classList.add("show");
});

// Close modal
closeModal.addEventListener("click", function () {
    candidateModal.classList.remove("show");
});

// Close when clicking outside the popup
candidateModal.addEventListener("click", function (event) {
    if (event.target === candidateModal) {
        candidateModal.classList.remove("show");
    }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        candidateModal.classList.remove("show");
    }
});

// Update candidate application status
candidateStatusSelect.addEventListener("change", function () {
    const selectedCandidate = candidates.find(candidate =>
        candidate.name === candidateName.textContent
    );

    if (selectedCandidate) {
        selectedCandidate.status = candidateStatusSelect.value;
        
        localStorage.setItem(
    "careerBridgeCandidates",
    JSON.stringify(candidates)
);

        const row = [...document.querySelectorAll(".applications-table tbody tr")]
            .find(row => row.cells[0].textContent === selectedCandidate.name);

        if (candidate) {
    const statusBadge = row.querySelector(".status");

    statusBadge.textContent = candidate.status;
    statusBadge.className = "status " + candidate.status.toLowerCase();

} else {
    // Remove candidates previously deleted
    row.remove();
}

        updateDashboardStats();
    }
});

let candidates = JSON.parse(
    localStorage.getItem("careerBridgeCandidates")
) || defaultCandidates;

// Restore saved statuses when the dashboard loads
// Restore saved candidates when the dashboard loads
document.querySelectorAll(".applications-table tbody tr").forEach(row => {
    const candidate = candidates.find(
        item => item.name === row.cells[0].textContent.trim()
    );

    if (candidate) {
        const statusBadge = row.querySelector(".status");

        statusBadge.textContent = candidate.status;
        statusBadge.className = "status " + candidate.status.toLowerCase();

    } else {
        // Remove candidates that are no longer saved
        row.remove();
    }
});

// Application search
const applicationSearch = document.getElementById("application-search");

applicationSearch.addEventListener("input", function () {
    const searchTerm = applicationSearch.value.toLowerCase().trim();

    document.querySelectorAll(".applications-table tbody tr").forEach(row => {
        const candidateName = row.cells[0].textContent.toLowerCase();
        const position = row.cells[1].textContent.toLowerCase();

        row.style.display =
            candidateName.includes(searchTerm) ||
            position.includes(searchTerm)
                ? ""
                : "none";
    });
});

// APPLICATION SEARCH AND FILTERS

// const applicationSearch = document.getElementById("application-search");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

function filterApplications() {
    const searchTerm = applicationSearch.value.toLowerCase().trim();

    document.querySelectorAll(".applications-table tbody tr").forEach(row => {
        const candidateName = row.cells[0].textContent.toLowerCase();
        const position = row.cells[1].textContent.toLowerCase();
        const status = row.querySelector(".status").textContent.trim();

        const matchesSearch =
            candidateName.includes(searchTerm) ||
            position.includes(searchTerm);

        const matchesFilter =
            activeFilter === "all" ||
            status === activeFilter;

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

// Search candidates
applicationSearch.addEventListener("input", filterApplications);

// Filter by application status
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        activeFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        filterApplications();
    });
});

// DYNAMIC DASHBOARD STATISTICS

function updateDashboardStats() {
    const total = candidates.length;

    const pending = candidates.filter(
        candidate => candidate.status === "Pending"
    ).length;

    const shortlisted = candidates.filter(
        candidate => candidate.status === "Shortlisted"
    ).length;

    const rejected = candidates.filter(
        candidate => candidate.status === "Rejected"
    ).length;

    document.getElementById("total-applications").textContent = total;
    document.getElementById("pending-applications").textContent = pending;
    document.getElementById("shortlisted-applications").textContent = shortlisted;
    document.getElementById("rejected-applications").textContent = rejected;
}

// Run when dashboard loads
updateDashboardStats();


// EXPORT APPLICATIONS TO CSV

const exportButton = document.getElementById("export-applications");

exportButton.addEventListener("click", function () {
    const headers = ["Candidate", "Position", "Date Applied", "Status"];

    const rows = candidates.map(candidate => [
        candidate.name,
        candidate.position,
        candidate.date,
        candidate.status
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(value =>
            `"${String(value).replace(/"/g, '""')}"`
        ).join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "careerbridge-applications.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});

// DELETE CANDIDATE APPLICATIONS



applicationTable.addEventListener("click", async function (event) {
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) return;

    const row = deleteButton.closest("tr");
    const candidateName = row.cells[0].textContent;

    const confirmed = confirm(
        `Are you sure you want to delete ${candidateName}'s application?`
    );

    if (!confirmed) return;

    candidates = candidates.filter(
        candidate => candidate.name !== candidateName
    );

    localStorage.setItem(
        "careerBridgeCandidates",
        JSON.stringify(candidates)
    );

    row.remove();

    updateDashboardStats();
    filterApplications();
});

// OPEN ADD CANDIDATE MODAL

const addCandidateButton = document.getElementById("add-candidate");
const addCandidateModal = document.getElementById("add-candidate-modal");
const addCandidateClose = document.getElementById("add-candidate-close");

addCandidateButton.addEventListener("click", function () {
    addCandidateModal.classList.add("show");
});

addCandidateClose.addEventListener("click", function () {
    addCandidateModal.classList.remove("show");
});

// ADD NEW CANDIDATE

// ADD NEW CANDIDATE WITH CV
const addCandidateForm = document.getElementById("add-candidate-form");

const newCandidateCV = document.getElementById("new-candidate-cv");

addCandidateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const file = newCandidateCV.files[0];

    if (file && file.size > 1024 * 1024) {
        alert("For this demo, please upload a CV smaller than 1MB.");
        return;
    }

    const saveCandidate = (cvData = "") => {
        const newCandidate = {
            name: document.getElementById("new-candidate-name").value.trim(),
            position: document.getElementById("new-candidate-position").value.trim(),
            date: document.getElementById("new-candidate-date").value,
            status: document.getElementById("new-candidate-status").value,
            cvName: file ? file.name : "",
            cvData: cvData
        };

        candidates.push(newCandidate);

        localStorage.setItem(
            "careerBridgeCandidates",
            JSON.stringify(candidates)
        );

        location.reload();
    };

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            saveCandidate(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        saveCandidate();
    }
});

// DISPLAY CANDIDATES IN THE TABLE

function renderCandidates() {
    const applicationsList = document.getElementById("applications-list");

    applicationsList.innerHTML = "";

    candidates.forEach(candidate => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${candidate.name}</td>
            <td>${candidate.position}</td>
            <td>${candidate.date}</td>
            <td>
                <span class="status ${candidate.status.toLowerCase()}">
                    ${candidate.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="view-btn" type="button">View</button>
                    <button class="edit-btn" type="button">Edit</button>
                    <button class="delete-btn" type="button">Delete</button>
                </div>
            </td>
        `;

        applicationsList.appendChild(row);
    });
}

renderCandidates();

// EDIT CANDIDATE MODAL

const editCandidateModal = document.getElementById("edit-candidate-modal");
const editCandidateClose = document.getElementById("edit-candidate-close");

const editCandidateForm = document.getElementById("edit-candidate-form");

const editCandidateName = document.getElementById("edit-candidate-name");
const editCandidatePosition = document.getElementById("edit-candidate-position");
const editCandidateDate = document.getElementById("edit-candidate-date");
const editCandidateStatus = document.getElementById("edit-candidate-status");
const editCandidateCV = document.getElementById("edit-candidate-cv");

let editingCandidate = null;

applicationTable.addEventListener("click", function (event) {
    const editButton = event.target.closest(".edit-btn");

    if (!editButton) return;

    const row = editButton.closest("tr");
    const name = row.cells[0].textContent.trim();

    editingCandidate = candidates.find(
        item => item.name === name
    );

    if (!editingCandidate) return;

    editCandidateName.value = editingCandidate.name;
    editCandidatePosition.value = editingCandidate.position;
    editCandidateDate.value = editingCandidate.date;
    editCandidateStatus.value = editingCandidate.status;

    editCandidateModal.classList.add("show");
});

editCandidateClose.addEventListener("click", function () {
    editCandidateModal.classList.remove("show");
});

// SAVE EDITED CANDIDATE

// SAVE EDITED CANDIDATE WITH CV REPLACEMENT

editCandidateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!editingCandidate) return;

    const file = editCandidateCV.files[0];

    if (file && file.size > 1024 * 1024) {
        alert("For this demo, please upload a CV smaller than 1MB.");
        return;
    }

    const saveChanges = (cvData) => {
        editingCandidate.name = editCandidateName.value.trim();
        editingCandidate.position = editCandidatePosition.value.trim();
        editingCandidate.date = editCandidateDate.value;
        editingCandidate.status = editCandidateStatus.value;

        if (file) {
            editingCandidate.cvName = file.name;
            editingCandidate.cvData = cvData;
        }

        localStorage.setItem(
            "careerBridgeCandidates",
            JSON.stringify(candidates)
        );

        renderCandidates();
        updateDashboardStats();
        filterApplications();

        editCandidateModal.classList.remove("show");
        editCandidateForm.reset();
        editingCandidate = null;
    };

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            saveChanges(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        saveChanges(editingCandidate.cvData || "");
    }
});
