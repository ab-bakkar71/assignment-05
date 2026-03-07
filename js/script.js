// function for labels


// All card Api
const AllIssues = () =>{
 fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
 .then(res=> res.json())
 .then(data => issuesDisplay(data.data))
}

// all card display
const issuesDisplay = (issues) => {
    const issuesContainer =document.getElementById('issues-container');
    const allCount = document.getElementById('all-count');
    allCount.innerText=issues.length;
    issuesContainer.innerHTML= "";
    for(let issue of issues){
        const issueCard = document.createElement('div');
        // border change with status
        const borderClass = issue.status == "open" ? "border-t-4 border-[#00A96E]"
            : "border-t-4 border-[#A855F7]";

        // Icon change with status

        const changeIcon = issue.status == "open" ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt=""></img>`

        // all card Show
        issueCard.innerHTML =`
        <div class="card bg-base-100 w-full shadow-sm ${borderClass} ">
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
            <p class="badge badge-outline badge-error font-medium text-[#EF4444] bg-[#FEECEC]"> Bug</p>
            <p class="badge badge-outline badge-warning font-medium text-[#D97706] bg-[#FDE68A]"> Warning</p>
          </div>
          <hr class="w-full block border-[#E4E4E7] my-4">
          <div class="space-y-2.5 text-[#64748B]">
            <p># ${issue.id} ${issue.author}</p>
            <p>${issue.createdAt}</p>
          </div>
        </div>
      </div>
        `

       

        issuesContainer.append(issueCard);
    }
}
AllIssues()