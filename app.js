const storageKey = "deal-os-mvp";

const state = {
  deals: [],
  activeDealId: null,
};

const ui = {
  activeDeal: document.getElementById("active-deal"),
  dealName: document.getElementById("deal-name"),
  dealStage: document.getElementById("deal-stage"),
  nextMeeting: document.getElementById("next-meeting"),
  nextActions: document.getElementById("next-actions"),
  topRisks: document.getElementById("top-risks"),
  proofGaps: document.getElementById("proof-gaps"),
  proofRows: document.getElementById("proof-rows"),
  stakeholderCards: document.getElementById("stakeholder-cards"),
  artefactCards: document.getElementById("artefact-cards"),
  timelineList: document.getElementById("timeline-list"),
  taskList: document.getElementById("task-list"),
  modal: document.getElementById("modal"),
  modalTitle: document.getElementById("modal-title"),
  modalFields: document.getElementById("modal-fields"),
  modalSubmit: document.getElementById("modal-submit"),
};

const templates = {
  execBrief: () =>
    "Exec Brief\n\nSummary:\n- Deal stage:\n- Strategic priority:\n\nProof status:\n- Proven:\n- Assumed:\n\nRisks:\n- \n\nNext actions:\n- ",
  followUpEmail: () =>
    "Subject: Next steps\n\nHi [Name],\n\nThanks for the conversation today. Recapping the key priorities we heard:\n- [Priority 1]\n- [Priority 2]\n\nProposed next steps:\n- [Action 1]\n- [Action 2]\n\nOpen proof gaps to resolve:\n- [Gap]\n\nBest,\n[Your Name]",
  meddpiccSnapshot: () =>
    "MEDDPICC Snapshot\n\nMetrics:\nEconomic Buyer:\nDecision Criteria:\nDecision Process:\nPaper Process:\nIdentify Pain:\nChampion:\nCompetition:\n\nGaps to close:\n- ",
};

const modalDefinitions = {
  proof: {
    title: "Add proof item",
    fields: [
      { key: "criteria", label: "Decision criteria", type: "text" },
      { key: "evidence", label: "Evidence required", type: "text" },
      { key: "owner", label: "Owner", type: "text" },
      { key: "status", label: "Status", type: "text" },
      { key: "due", label: "Due date", type: "date" },
      {
        key: "track",
        label: "Track",
        type: "select",
        options: ["Evaluation", "Implementation"],
      },
    ],
  },
  stakeholder: {
    title: "Add stakeholder",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role/Function", type: "text" },
      { key: "influence", label: "Influence", type: "text" },
      { key: "stance", label: "Stance", type: "text" },
      { key: "relationship", label: "Relationship strength", type: "text" },
      { key: "careAbout", label: "What they care about", type: "text" },
      { key: "mobiliser", label: "Mobiliser plan", type: "text" },
    ],
  },
  artefact: {
    title: "Add artefact",
    fields: [
      {
        key: "type",
        label: "Artefact type",
        type: "select",
        options: [
          "Exec brief",
          "Stakeholder map",
          "Evaluation plan",
          "Business case",
          "Follow-up email",
          "Slack update",
        ],
      },
      { key: "version", label: "Version", type: "text" },
      { key: "owner", label: "Owner", type: "text" },
      { key: "notes", label: "Notes", type: "text" },
    ],
  },
  event: {
    title: "Add timeline event",
    fields: [
      { key: "date", label: "Date", type: "date" },
      { key: "summary", label: "Summary", type: "text" },
      { key: "impact", label: "Why it matters", type: "text" },
    ],
  },
  task: {
    title: "Add action item",
    fields: [
      { key: "task", label: "Task", type: "text" },
      { key: "owner", label: "Owner", type: "text" },
      { key: "due", label: "Due date", type: "date" },
      { key: "status", label: "Status", type: "text" },
      { key: "dependency", label: "Dependency", type: "text" },
    ],
  },
};

const saveState = () => {
  localStorage.setItem(storageKey, JSON.stringify(state));
};

const loadState = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    Object.assign(state, JSON.parse(stored));
  }

  if (!state.deals.length) {
    const deal = createEmptyDeal();
    deal.name = "Example: Nimbus Global";
    deal.stage = "Evaluation";
    deal.nextActions = "Confirm success criteria for pilot\nDraft exec brief for EB";
    deal.topRisks = "Procurement timeline unclear\nUnconfirmed legal owner";
    deal.proofGaps = "Missing pass/fail criteria for data validation";
    deal.proofItems.push({
      criteria: "Security review passed",
      evidence: "InfoSec approval memo",
      owner: "Alyssa (Customer)",
      status: "In progress",
      due: "",
      track: "Evaluation",
    });
    deal.stakeholders.push({
      name: "Jordan Lee",
      role: "VP Operations",
      influence: "High",
      stance: "Supporter",
      relationship: "Warm",
      careAbout: "Cycle time reduction",
      mobiliser: "Equip with proof points + ROI summary",
    });
    deal.artefacts.push({
      type: "Exec brief",
      version: "v1",
      owner: "You",
      notes: "Drafted from discovery call",
      content: templates.execBrief(),
    });
    deal.timeline.push({
      date: "",
      summary: "Discovery call completed",
      impact: "Captured strategic priorities and evaluation criteria",
    });
    deal.tasks.push({
      task: "Send follow-up email with recap",
      owner: "You",
      due: "",
      status: "Open",
      dependency: "Confirm next meeting",
    });
    state.deals.push(deal);
    state.activeDealId = deal.id;
  }
};

const createEmptyDeal = () => ({
  id: crypto.randomUUID(),
  name: "",
  stage: "Discovery",
  nextMeeting: "",
  nextActions: "",
  topRisks: "",
  proofGaps: "",
  proofItems: [],
  stakeholders: [],
  artefacts: [
    {
      type: "Exec brief",
      version: "v1",
      owner: "",
      notes: "",
      content: templates.execBrief(),
    },
    {
      type: "Follow-up email",
      version: "v1",
      owner: "",
      notes: "",
      content: templates.followUpEmail(),
    },
    {
      type: "MEDDPICC snapshot",
      version: "v1",
      owner: "",
      notes: "",
      content: templates.meddpiccSnapshot(),
    },
  ],
  timeline: [],
  tasks: [],
});

const getActiveDeal = () => state.deals.find((deal) => deal.id === state.activeDealId);

const renderDeal = () => {
  const deal = getActiveDeal();
  if (!deal) return;

  ui.activeDeal.textContent = deal.name || "Untitled deal";
  ui.dealName.value = deal.name;
  ui.dealStage.value = deal.stage;
  ui.nextMeeting.value = deal.nextMeeting;
  ui.nextActions.value = deal.nextActions;
  ui.topRisks.value = deal.topRisks;
  ui.proofGaps.value = deal.proofGaps;

  ui.proofRows.innerHTML = "";
  deal.proofItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.criteria}</td>
      <td>${item.evidence}</td>
      <td>${item.owner}</td>
      <td>${item.status} <span class="muted">(${item.track})</span></td>
      <td>${item.due || ""}</td>
      <td><button data-remove="proof" data-index="${index}">Remove</button></td>
    `;
    ui.proofRows.appendChild(row);
  });

  ui.stakeholderCards.innerHTML = "";
  deal.stakeholders.forEach((stakeholder, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${stakeholder.name}</h4>
      <p>${stakeholder.role}</p>
      <p><strong>Influence:</strong> ${stakeholder.influence}</p>
      <p><strong>Stance:</strong> ${stakeholder.stance}</p>
      <p><strong>Relationship:</strong> ${stakeholder.relationship}</p>
      <p><strong>Cares about:</strong> ${stakeholder.careAbout}</p>
      <p><strong>Mobiliser plan:</strong> ${stakeholder.mobiliser}</p>
      <button data-remove="stakeholder" data-index="${index}">Remove</button>
    `;
    ui.stakeholderCards.appendChild(card);
  });

  ui.artefactCards.innerHTML = "";
  deal.artefacts.forEach((artefact, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${artefact.type} (${artefact.version})</h4>
      <p><strong>Owner:</strong> ${artefact.owner || "-"}</p>
      <p><strong>Notes:</strong> ${artefact.notes || "-"}</p>
      <pre>${artefact.content || ""}</pre>
      <button data-remove="artefact" data-index="${index}">Remove</button>
    `;
    ui.artefactCards.appendChild(card);
  });

  ui.timelineList.innerHTML = "";
  deal.timeline.forEach((event, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div>
        <strong>${event.summary}</strong><br />
        <span>${event.impact}</span>
      </div>
      <span>${event.date || ""}</span>
      <button data-remove="event" data-index="${index}">Remove</button>
    `;
    ui.timelineList.appendChild(item);
  });

  ui.taskList.innerHTML = "";
  deal.tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div>
        <strong>${task.task}</strong><br />
        <span>Owner: ${task.owner || ""} • Dependency: ${task.dependency || ""}</span>
      </div>
      <span>${task.status || ""} ${task.due ? `• ${task.due}` : ""}</span>
      <button data-remove="task" data-index="${index}">Remove</button>
    `;
    ui.taskList.appendChild(item);
  });
};

const openModal = (type, onSave) => {
  const definition = modalDefinitions[type];
  ui.modalTitle.textContent = definition.title;
  ui.modalFields.innerHTML = "";

  definition.fields.forEach((field) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = field.label;
    label.setAttribute("for", `modal-${field.key}`);

    let input;
    if (field.type === "select") {
      input = document.createElement("select");
      field.options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type;
    }

    input.id = `modal-${field.key}`;
    input.name = field.key;
    wrapper.append(label, input);
    ui.modalFields.appendChild(wrapper);
  });

  const handler = (event) => {
    if (event.target.returnValue !== "confirm") {
      ui.modal.removeEventListener("close", handler);
      return;
    }

    const values = {};
    definition.fields.forEach((field) => {
      values[field.key] = ui.modal.querySelector(`#modal-${field.key}`).value.trim();
    });

    onSave(values);
    ui.modal.removeEventListener("close", handler);
  };

  ui.modal.addEventListener("close", handler);
  ui.modal.showModal();
};

const bindActions = () => {
  document.getElementById("save-deal").addEventListener("click", () => {
    const deal = getActiveDeal();
    if (!deal) return;

    deal.name = ui.dealName.value.trim();
    deal.stage = ui.dealStage.value;
    deal.nextMeeting = ui.nextMeeting.value;
    deal.nextActions = ui.nextActions.value;
    deal.topRisks = ui.topRisks.value;
    deal.proofGaps = ui.proofGaps.value;

    saveState();
    renderDeal();
  });

  document.getElementById("new-deal").addEventListener("click", () => {
    const deal = createEmptyDeal();
    state.deals.push(deal);
    state.activeDealId = deal.id;
    saveState();
    renderDeal();
  });

  document.getElementById("export-data").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deal-os-export.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("add-proof").addEventListener("click", () => {
    openModal("proof", (values) => {
      getActiveDeal().proofItems.push(values);
      saveState();
      renderDeal();
    });
  });

  document.getElementById("add-stakeholder").addEventListener("click", () => {
    openModal("stakeholder", (values) => {
      getActiveDeal().stakeholders.push(values);
      saveState();
      renderDeal();
    });
  });

  document.getElementById("add-artefact").addEventListener("click", () => {
    openModal("artefact", (values) => {
      getActiveDeal().artefacts.push({
        ...values,
        content: "",
      });
      saveState();
      renderDeal();
    });
  });

  document.getElementById("add-event").addEventListener("click", () => {
    openModal("event", (values) => {
      getActiveDeal().timeline.push(values);
      saveState();
      renderDeal();
    });
  });

  document.getElementById("add-task").addEventListener("click", () => {
    openModal("task", (values) => {
      getActiveDeal().tasks.push(values);
      saveState();
      renderDeal();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const type = target.dataset.remove;
    if (!type) return;

    const index = Number(target.dataset.index);
    const deal = getActiveDeal();
    if (!deal) return;

    const map = {
      proof: deal.proofItems,
      stakeholder: deal.stakeholders,
      artefact: deal.artefacts,
      event: deal.timeline,
      task: deal.tasks,
    };

    if (map[type]) {
      map[type].splice(index, 1);
      saveState();
      renderDeal();
    }
  });
};

loadState();
bindActions();
renderDeal();
