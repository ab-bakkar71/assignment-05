let issues = [];
let currentTab = 'all';
const tabActive = ["bg-[#4A00FF]", "border-none","text-white" ];
const tabInActive = ["bg-transparent", "border-[#E4E4E7]", "text-[#64748B" ]

// All card Api
const AllIssues = () =>{
 fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
 .then(res=> res.json())
 .then(data => {
   issues = data.data;
   displayIssues();
 })
}

// issues details modal
const issuesDetail = async(id) => {
  const detailUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res =await fetch(detailUrl);
  const details = await res.json();
  displayIssuesDetails(details.data)
  
}

// display issues details

const displayIssuesDetails = (issue) => {
  console.log(issue)
  const detailsModal = document.getElementById('details-container')
  detailsModal.innerHTML="This is modal"

  document.getElementById('modal_details').showModal();
}

const displayIssues = () => {
  let filterIssues = issues;
  
  if(currentTab === 'open') {
    filterIssues = issues.filter(issue => issue.status === 'open');
  } else if(currentTab === 'closed') {
    filterIssues = issues.filter(issue => issue.status === 'closed');
  }
  
  issuesDisplay(filterIssues);
}

// all card display
const issuesDisplay = (issues) => {
    const issuesContainer = document.getElementById('issues-container');
    const allCount = document.getElementById('all-count');
    
    // issue count
    if(currentTab === 'all') {
      allCount.innerText = issues.length + ' Issues';
    } else if(currentTab === 'open') {
      const openCount = issues.filter(i => i.status === 'open').length;
      allCount.innerText = openCount + '  Issues';
    } else if(currentTab === 'closed') {
      const closedCount = issues.filter(i => i.status === 'closed').length;
      allCount.innerText = closedCount + '  Issues';
    }

    issuesContainer.innerHTML = "";
    
    for(let issue of issues){
        const issueCard = document.createElement('div');
        // border change with status
        const borderClass = issue.status == "open" ? "border-t-4 border-[#00A96E]"
            : "border-t-4 border-[#A855F7]";

        // Icon change with status
        const changeIcon = issue.status == "open" ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt=""></img>`

        // all card Show
        issueCard.innerHTML =`
        <div class="card bg-base-100 w-full shadow-sm ${borderClass}">
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
            <p class="badge badge-outline badge-error font-medium text-[#EF4444] bg-[#FEECEC]"> ${issue.labels[0]}</p>
            <p class="badge badge-outline badge-warning font-medium text-[#D97706] bg-[#FDE68A]"> ${issue.labels[1]}</p>
          </div>
          <hr class="w-full block border-[#E4E4E7] my-4">
          <div class="space-y-2.5 text-[#64748B]">
            <p># ${issue.id} ${issue.author}</p>
            <p>${issue.createdAt}</p>
          </div>
        </div>
      </div>
        `

        issueCard.onclick = () =>displayIssuesDetails();
        issuesContainer.append(issueCard);
    }
}

// toggle btn function
function switchTab(tab){
  currentTab = tab;
  const tabs = ["all", "open", "closed"];

  for(const t of tabs){
    const tabName = document.getElementById("tab-"+ t);
    if(t === tab){
      tabName.classList.remove(...tabInActive);
      tabName.classList.add(...tabActive);
    }
    else{
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInActive)
    }
  }
  
  // Display filtered issues
  displayIssues();
}

switchTab(currentTab);
AllIssues();