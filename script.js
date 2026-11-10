
// =========================
// CAREERBRIDGE MOBILE MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";

        });

    });

}

// CAREERBRIDGE JOB SEARCH
const jobSearchForm = document.getElementById("job-search-form");
const jobKeyword = document.getElementById("job-keyword");
const jobLocation = document.getElementById("job-location");
const jobCards = document.querySelectorAll(".job-card");
const jobFeedback = document.getElementById("job-search-feedback");

if (jobSearchForm) {
    jobSearchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const keyword = jobKeyword.value.trim().toLowerCase();
        const location = jobLocation.value.trim().toLowerCase();

        let visibleJobs = 0;

        jobCards.forEach(function(card) {
            const title = card.dataset.title.toLowerCase();
            const company = card.dataset.company.toLowerCase();
            const jobLocation = card.dataset.location.toLowerCase();

            const matchesKeyword =
                !keyword ||
                title.includes(keyword) ||
                company.includes(keyword);

            const matchesLocation =
                !location || jobLocation.includes(location);

            if (matchesKeyword && matchesLocation) {
                card.style.display = "";
                visibleJobs++;
            } else {
                card.style.display = "none";
            }
        });

        if (jobFeedback) {
            jobFeedback.textContent = visibleJobs === 0
                ? "No matching jobs found. Try another search."
                : `${visibleJobs} job opportunity found.`;
        }
    });
}

// JOB DETAILS MODAL
const jobModal = document.getElementById("job-modal");
const modalClose = document.getElementById("modal-close");
const modalApply = document.getElementById("modal-apply");

const modalTitle = document.getElementById("modal-job-title");
const modalCompany = document.getElementById("modal-job-company");
const modalLocation = document.getElementById("modal-job-location");
const modalDescription = document.getElementById("modal-job-description");
const modalSalary = document.getElementById("modal-job-salary");

document.querySelectorAll(".job-card").forEach(function(card) {
    const viewLink = card.querySelector(".job-link");

    viewLink.addEventListener("click", function(event) {
        event.preventDefault();

        modalTitle.textContent = card.dataset.title;
        modalCompany.textContent = card.dataset.company;
        modalLocation.textContent = "📍 " + card.dataset.location;
        modalDescription.textContent = card.dataset.description;

        const salary = card.querySelector(".job-details span:nth-child(2)");
        modalSalary.textContent = salary
            ? salary.textContent
            : "Salary not specified";

        jobModal.classList.add("active");
        jobModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeJobModal() {
    jobModal.classList.remove("active");
    jobModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (modalClose) {
    modalClose.addEventListener("click", closeJobModal);
}

if (jobModal) {
    jobModal.addEventListener("click", function(event) {
        if (event.target === jobModal) {
            closeJobModal();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && jobModal.classList.contains("active")) {
        closeJobModal();
    }
});

// APPLICATION FORM MODAL
const applicationModal = document.getElementById("application-modal");
const applicationClose = document.getElementById("application-close");
const applicationJob = document.getElementById("application-job");
const applicationForm = document.getElementById("application-form");
const applicationFeedback = document.getElementById("application-feedback");

// Open application form
if (modalApply) {
    modalApply.addEventListener("click", function() {
        const selectedJob = modalTitle.textContent;

        applicationJob.value = selectedJob;

        closeJobModal();

        applicationModal.classList.add("active");
        applicationModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
}

// Close application form
function closeApplicationModal() {
    applicationModal.classList.remove("active");
    applicationModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (applicationClose) {
    applicationClose.addEventListener("click", closeApplicationModal);
}

// Close when clicking outside the form
if (applicationModal) {
    applicationModal.addEventListener("click", function(event) {
        if (event.target === applicationModal) {
            closeApplicationModal();
        }
    });
}

// Handle application form submission (frontend demonstration)
// Handle application form submission
if (applicationForm) {
    applicationForm.addEventListener("submit", function(event) {
        const formData = new FormData(applicationForm);

        if (!formData.get("job")) {
            event.preventDefault();
            applicationFeedback.textContent =
                "Please select a job before submitting.";
        }
    });
}

