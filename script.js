let mode = "";
let branch = "";
let year = "";

const PASS = "Sai@123";

function enterAdmin() {
  if (document.getElementById("adminPass").value === PASS) {
    mode = "admin";
    showBranch();
  } else {
    alert("Wrong Password → Student Mode");
    enterStudent();
  }
}

function enterStudent() {
  mode = "student";
  showBranch();
}

function showBranch() {
  hideAll();
  document.getElementById("branchSection").classList.remove("hidden");
}

function selectBranch(b) {
  branch = b;
  hideAll();
  document.getElementById("yearSection").classList.remove("hidden");
  document.getElementById("branchTitle").innerText = b + " - Select Year";
}

function selectYear(y) {
  year = y;
  hideAll();
  document.getElementById("pdfSection").classList.remove("hidden");
  document.getElementById("yearTitle").innerText = branch + " - " + y + " Year PDFs";
  loadPDFs();
  document.getElementById("pdfInput").style.display =
    mode === "admin" ? "block" : "none";
}

function hideAll() {
  ["modeSection","branchSection","yearSection","pdfSection"]
    .forEach(id => document.getElementById(id).classList.add("hidden"));
}

function goMode(){ hideAll(); document.getElementById("modeSection").classList.remove("hidden"); }
function goBranch(){ showBranch(); }
function goYear(){ selectBranch(branch); }

function key() {
  return `${branch}_${year}`;
}

function loadPDFs() {
  const list = document.getElementById("pdfList");
  list.innerHTML = "";
  const data = JSON.parse(localStorage.getItem(key())) || [];

  data.forEach((pdf,i)=>{
    const div = document.createElement("div");
    div.className = "pdf-item";

    const a = document.createElement("a");
    a.href = pdf.url;
    a.target="_blank";
    a.textContent = pdf.name;
    div.appendChild(a);

    if(mode==="admin"){
      const d = document.createElement("button");
      d.textContent="Delete";
      d.className="delete";
      d.onclick=()=>deletePDF(i);
      div.appendChild(d);
    }

    list.appendChild(div);
  });
}

document.getElementById("pdfInput").addEventListener("change",function(){
  let data = JSON.parse(localStorage.getItem(key())) || [];

  [...this.files].forEach(f=>{
    if(f.type==="application/pdf"){
      data.push({name:f.name,url:URL.createObjectURL(f)});
    }
  });

  localStorage.setItem(key(),JSON.stringify(data));
  loadPDFs();
});

function deletePDF(i){
  let data = JSON.parse(localStorage.getItem(key()));
  data.splice(i,1);
  localStorage.setItem(key(),JSON.stringify(data));
  loadPDFs();
}
