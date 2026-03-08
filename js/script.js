let issues = [];
let currentTab = "all";
const tabActive = ["bg-[#4A00FF]", "border-none", "text-white"];
const tabInActive = ["bg-transparent", "border-[#E4E4E7]", "text-[#64748B"];

// All card Api
const AllIssues = () => {
  manageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;
      displayIssues();
      manageSpinner(false);
    });
};

// issues details modal
const issuesDetail = async (id) => {
  
  const detailUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(detailUrl);
  const details = await res.json();
  displayIssuesDetails(details.data);
};

// display issues details

const displayIssuesDetails = (issue) => {
  // status change with color
const changeBg =
      issue.status == "open"
        ? "text-white bg-emerald-500"
        : "text-white bg-purple-500"

  const detailsModal = document.getElementById("details-container");
  detailsModal.innerHTML = `
          <div>
            <h1 class="font-bold text-2xl text-[#1F2937]">
              ${issue.title}
            </h1>
            <div class="flex items-center gap-3 text-sm text-slate-500 my-3">
              <span
                class="px-3 py-1 ${changeBg} rounded-full text-xs font-medium"
                >${issue.status}</span
              >
              <span>•</span>
              <span>
                Opened by
                <span class="text-slate-700 font-medium">${issue.author}</span>
              </span>
              <span>•</span>
              <span>${issue.createdAt.split("T")[0]}</span>
            </div>
            <div>
              <p
                class="badge badge-outline badge-error font-medium text-[#EF4444] bg-[#FEECEC]"
              >
                ${issue.labels[0] || "Not Found"}
              </p>
              <p
                class="badge badge-outline badge-warning font-medium text-[#D97706] bg-[#FDE68A]"
              >
               ${issue.labels[1] || "Not Found"}
              </p>
            </div>
            <p class="text-[#64748B] my-6">
             ${issue.description}
            </p>

            <div
              class="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p class="text-gray-500 text-sm">Assignee:</p>
                <p class="font-semibold text-gray-800">${issue.assignee}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500 text-sm">Priority:</p>
                <span
                  class="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full"
                >
                  ${issue.priority}
                </span>
              </div>
            </div>
          </div>
  `;

  document.getElementById("modal_details").showModal();
};

const displayIssues = () => {
  let filterIssues = issues;

  if (currentTab === "open") {
    filterIssues = issues.filter((issue) => issue.status === "open");
  } else if (currentTab === "closed") {
    filterIssues = issues.filter((issue) => issue.status === "closed");
  }

  issuesDisplay(filterIssues);
};

// all card display
const issuesDisplay = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  const allCount = document.getElementById("all-count");

  // issue count
  if (currentTab === "all") {
    allCount.innerText = issues.length + " Issues";
  } else if (currentTab === "open") {
    const openCount = issues.filter((i) => i.status === "open").length;
    allCount.innerText = openCount + "  Issues";
  } else if (currentTab === "closed") {
    const closedCount = issues.filter((i) => i.status === "closed").length;
    allCount.innerText = closedCount + "  Issues";
  }

  issuesContainer.innerHTML = "";

  for (let issue of issues) {
    const issueCard = document.createElement("div");
    // border change with status
    const borderClass =
      issue.status == "open"
        ? "border-t-4 border-[#00A96E]"
        : "border-t-4 border-[#A855F7]";

    // Icon change with status
    const changeIcon =
      issue.status == "open"
        ? `<img src="./assets/Open-Status.png" alt=""></img>`
        : `<img src="./assets/Closed- Status .png" alt=""></img>`;

    // all card Show
    issueCard.innerHTML = `
        <div class="card bg-base-100 w-full h-full shadow-sm cursor-pointer ${borderClass}">
        <div class="card-body">
          <div class="flex justify-between items-center">
            ${changeIcon}
            <div class="badge badge-soft bg-[#FEECEC] text-[#EF4444] font-bold border-none">${issue.priority}</div>
          </div>
          <h2 class="card-title">${issue.title}</h2>
          <p class="line-clamp-2">
           ${issue.description}
          </p>
          <div>
            <p class="badge badge-outline badge-error font-medium text-[#EF4444] bg-[#FEECEC]"> ${issue.labels[0] || "Not Found"}</p>
            <p class="badge badge-outline badge-warning font-medium text-[#D97706] bg-[#FDE68A]"> ${issue.labels[1] || "Not Found"}</p>
          </div>
          <hr class="w-full block border-[#E4E4E7] my-4">
          <div class="space-y-2.5 text-[#64748B]">
            <p># ${issue.id} ${issue.author}</p>
            <p>${issue.createdAt.split("T")[0]}</p>
          </div>
        </div>
      </div>
        `;

    issueCard.onclick = () => issuesDetail(issue.id);
    issuesContainer.append(issueCard);
  }
};

// toggle btn function
function switchTab(tab) {
  currentTab = tab;
  const tabs = ["all", "open", "closed"];

  for (const t of tabs) {
    const tabName = document.getElementById("tab-" + t);
    if (t === tab) {
      tabName.classList.remove(...tabInActive);
      tabName.classList.add(...tabActive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInActive);
    }
  }

  // Display filtered issues
  manageSpinner(true);
  setTimeout(() => {
    displayIssues();
    manageSpinner(false);
  });
}

// manage spinner
const manageSpinner = (status)=>{
  if(status==true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('issues-container').classList.add('hidden');
  }
  else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('issues-container').classList.remove('hidden');
  }
}


switchTab(currentTab);
AllIssues();
// search function
document.getElementById("btn-search").addEventListener("click", () => {
  const searchInput = document.getElementById("input-search").value.trim().toLowerCase();

  if(searchInput === ""){
    AllIssues();
    return;
  }
  
  manageSpinner(true);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;
      currentTab = "all";
      displayIssues();
      manageSpinner(false);
      
    });
});
