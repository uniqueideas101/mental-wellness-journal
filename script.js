const tabs = document.querySelectorAll('.tab');
const views = document.querySelectorAll('.view');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    views.forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

const saveBtn = document.getElementById("save");
const entryInput = document.getElementById("entryInput");
const entryList = document.getElementById("entryList");

saveBtn.addEventListener("click", function (){
  entryList.innerText = "";
  const content = entryInput.value.trim();
  if (content !== "") {
    const entryItem = document.createElement("p");
    entryItem.innerText = content;
    entryList.appendChild(entryItem);
    entryInput.value= "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelectorAll(".add");
  addBtn.forEach(button => {
    button.addEventListener("click", function() {
      const parentView = button.closest(".view");
      if (!parentView) return;
      const ul = parentView.querySelector("ul");
      if (!ul) return;
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Yay! One more.";
      li.appendChild(input);
      ul.appendChild(li);
    });
  });
});