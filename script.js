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

saveBtn.addEventListener("click", function () {
  const content = entryInput.value.trim();
  if (content !== "") {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(content);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    entryInput.value = "";
    showEntries();
  }
});

function showEntries() {
  entryList.innerText = "";
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  if (entries.length === 0) {
    entryList.innerText = "No entries yet.";
    return;
  }
  entries.forEach((content, index) => {
    const entryItem = document.createElement("p");
    entryItem.innerText = (index + 1) + ". " + content;
    entryList.appendChild(entryItem);
  });
}

function saveList(id, storageKey) {
  const inputs = document.querySelectorAll(`#${id} input`);
  const data = Array.from(inputs).map(input => input.value);
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadList(id, storageKey) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  const data = JSON.parse(localStorage.getItem(storageKey)) || [];

  data.forEach(item => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type here...";
    input.value = item;
    input.addEventListener("input", () => saveList(id, storageKey));
    li.appendChild(input);
    list.appendChild(li);
  });

  if (data.length === 0) {
    
    for (let i = 0; i < 3; i++) {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Type here...";
      input.addEventListener("input", () => saveList(id, storageKey));
      li.appendChild(input);
      list.appendChild(li);
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  showEntries();
  loadList("happyList", "happyListData");
  loadList("gratitudeList", "gratitudeListData");
  loadList("angryList", "angryListData");

  const addBtns = document.querySelectorAll(".add");
  addBtns.forEach(button => {
    button.addEventListener("click", function () {
      const parentView = button.closest(".view");
      if (!parentView) return;
      const ul = parentView.querySelector("ul");
      if (!ul) return;
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Yay! One more.";
      input.addEventListener("input", () => {
        if (ul.id === "happyList") saveList("happyList", "happyListData");
        else if (ul.id === "gratitudeList") saveList("gratitudeList", "gratitudeListData");
        else if (ul.id === "angryList") saveList("angryList", "angryListData");
      });
      li.appendChild(input);
      ul.appendChild(li);
    });
  });
});
const analyzeBtn = document.getElementById("analyzeMood");
const moodResult = document.getElementById("moodResult");

analyzeBtn.addEventListener("click", () => {
  const text = entryInput.value.toLowerCase();
  
  const happyWords = ["happy", "joy", "excited", "grateful", "smile"];
  const sadWords = ["sad", "down", "lonely", "cry", "tired"];
  const angryWords = ["angry", "mad", "furious", "annoyed", "hate"];
  
  let score = { happy: 0, sad: 0, angry: 0 };
  
  happyWords.forEach(word => { if (text.includes(word)) score.happy++; });
  sadWords.forEach(word => { if (text.includes(word)) score.sad++; });
  angryWords.forEach(word => { if (text.includes(word)) score.angry++; });

  let mood = "Neutral";
  if (score.happy > score.sad && score.happy > score.angry) mood = "Happy";
  else if (score.sad > score.happy && score.sad > score.angry) mood = "Sad";
  else if (score.angry > score.happy && score.angry > score.sad) mood = "Angry";

  moodResult.innerText = `Mood Detected: ${mood}`;
});
const suggestionBox = document.getElementById("suggestionBox");

analyzeBtn.addEventListener("click", () => {
  const text = entryInput.value.toLowerCase();
  
  const happyWords = ["happy", "joy", "excited", "grateful", "smile"];
  const sadWords = ["sad", "down", "lonely", "cry", "tired"];
  const angryWords = ["angry", "mad", "furious", "annoyed", "hate"];
  
  let score = { happy: 0, sad: 0, angry: 0 };
  
  happyWords.forEach(word => { if (text.includes(word)) score.happy++; });
  sadWords.forEach(word => { if (text.includes(word)) score.sad++; });
  angryWords.forEach(word => { if (text.includes(word)) score.angry++; });

  let mood = "Neutral";
  let suggestion = "Keep journaling and stay mindful.";
  
  if (score.happy > score.sad && score.happy > score.angry) {
    mood = "Happy";
    suggestion = "Great to hear! Keep doing what makes you smile.";
  } else if (score.sad > score.happy && score.sad > score.angry) {
    mood = "Sad";
    suggestion = "Consider going for a walk, talking to a friend, or writing down three things you're grateful for.";
  } else if (score.angry > score.happy && score.angry > score.sad) {
    mood = "Angry";
    suggestion = "Try deep breathing or venting out in your journal. It’s okay to feel this way.";
  }

  moodResult.innerText = `Mood Detected: ${mood}`;
  suggestionBox.innerText = `Suggestion: ${suggestion}`;
});
