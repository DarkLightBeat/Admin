// Mock data (replace with actual data fetching)
const mockOrganizations = []; // Removed example organizations

const mockPrograms = []; // Removed example programs

// Data management functions (replace with actual data storage)
const getOrganizations = () => JSON.parse(localStorage.getItem("organizations") || "[]");

const getOrganizationById = (id) => {
  const organizations = getOrganizations();
  return organizations.find((org) => org.id === id);
};

const addOrganization = (organization) => {
  const organizations = getOrganizations();
  organizations.push(organization);
  localStorage.setItem("organizations", JSON.stringify(organizations));
};

const updateOrganization = (organization) => {
  let organizations = getOrganizations();
  organizations = organizations.map((org) => (org.id === organization.id ? organization : org));
  localStorage.setItem("organizations", JSON.stringify(organizations));
};

const deleteOrganization = (id) => {
  let organizations = getOrganizations();
  organizations = organizations.filter((org) => org.id !== id);
  localStorage.setItem("organizations", JSON.stringify(organizations));
};

const getProgramsByOrganization = (organizationId) =>
  JSON.parse(localStorage.getItem("programs") || "[]").filter((program) => program.organizationId === organizationId);

const getProgramById = (id) => {
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  return programs.find((program) => program.id === id);
};

const addProgram = (program) => {
  const programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs.push(program);
  localStorage.setItem("programs", JSON.stringify(programs));
};

const updateProgram = (program) => {
  let programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs = programs.map((p) => (p.id === program.id ? program : p));
  localStorage.setItem("programs", JSON.stringify(programs));
};

const deleteProgram = (id) => {
  let programs = JSON.parse(localStorage.getItem("programs") || "[]");
  programs = programs.filter((program) => program.id !== id);
  localStorage.setItem("programs", JSON.stringify(programs));
};

// Detail section and form field management
const getDetailSections = (programId) => {
  const program = getProgramById(programId);
  return program?.detailSections || [];
};

const getFormFields = (programId) => {
  const program = getProgramById(programId);
  return program?.formFields || [];
};

const addDetailSection = (programId, section) => {
  const program = getProgramById(programId);
  if (program) {
    if (!program.detailSections) program.detailSections = [];
    program.detailSections.push(section);
    updateProgram(program);
  }
};

const updateDetailSection = (programId, sectionId, updatedSection) => {
  const program = getProgramById(programId);
  if (program && program.detailSections) {
    program.detailSections = program.detailSections.map(section => 
      section.id === sectionId ? { ...section, ...updatedSection } : section
    );
    updateProgram(program);
  }
};

const deleteDetailSection = (programId, sectionId) => {
  const program = getProgramById(programId);
  if (program && program.detailSections) {
    program.detailSections = program.detailSections.filter(section => section.id !== sectionId);
    updateProgram(program);
  }
};

const addFormField = (programId, field) => {
  const program = getProgramById(programId);
  if (program) {
    if (!program.formFields) program.formFields = [];
    program.formFields.push(field);
    updateProgram(program);
  }
};

const updateFormField = (programId, fieldId, updatedField) => {
  const program = getProgramById(programId);
  if (program && program.formFields) {
    program.formFields = program.formFields.map(field => 
      field.id === fieldId ? { ...field, ...updatedField } : field
    );
    updateProgram(program);
  }
};

const deleteFormField = (programId, fieldId) => {
  const program = getProgramById(programId);
  if (program && program.formFields) {
    program.formFields = program.formFields.filter(field => field.id !== fieldId);
    updateProgram(program);
  }
};

const loadOrganizationPage = (organizationId) => {
  const organization = getOrganizationById(organizationId);
  if (!organization) return;

  const organizationName = document.getElementById("organization-name");
  const organizationLogo = document.getElementById("organization-logo");
  const organizationTitle = document.getElementById("organization-title");
  const organizationWebsite = document.getElementById("organization-website");
  const programsList = document.getElementById("programs-list");
  const addProgramButton = document.getElementById("add-program-button");

  if (organizationName) organizationName.textContent = organization.name;
  if (organizationTitle) organizationTitle.textContent = organization.name;
  if (organizationWebsite) {
    organizationWebsite.textContent = organization.website;
    organizationWebsite.href = organization.website;
  }

  if (organizationLogo) {
    organizationLogo.innerHTML = organization.logoUrl
      ? `<img src="${organization.logoUrl}" alt="${organization.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
  }

  if (programsList) {
    const programs = getProgramsByOrganization(organizationId);
    programsList.innerHTML = "";

    if (programs.length === 0) {
      programsList.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <p class="empty-title">No programs found</p>
          <p class="empty-subtitle">Tap the + button to add a program</p>
        </div>
      `;
    } else {
      programs.forEach((program) => {
        const programElement = document.createElement("div");
        programElement.className = "program-item";
        programElement.innerHTML = `
          <div class="program-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="program-info">
            <div class="program-name">${program.name}</div>
            <div class="program-category">${program.category}</div>
          </div>
          <button class="delete-button" data-id="${program.id}" aria-label="Delete program">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        `;

        programElement.querySelector(".program-info")?.addEventListener("click", () => {
          loadProgramEditorPage(program.id);
        });

        programElement.querySelector(".delete-button")?.addEventListener("click", (e) => {
          e.stopPropagation();
          showDeleteProgramDialog(program.id);
        });

        programsList.appendChild(programElement);
      });
    }
  }

  if (addProgramButton) {
    addProgramButton.onclick = () => {
      // Open the add program dialog
      const addProgramDialog = document.getElementById("add-program-dialog");
      if (addProgramDialog) {
        addProgramDialog.classList.remove("hidden");
        // Set organization id to the form
        const addProgramForm = document.getElementById("add-program-form");
        if (addProgramForm) {
          addProgramForm.setAttribute("data-organization-id", organizationId);
        }
      }
    };
  }

  showPage("organization-page");
};

const showDeleteDialog = (organizationId) => {
  const deleteDialog = document.getElementById("delete-dialog");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");

  if (deleteDialog && confirmDeleteButton && cancelDeleteButton) {
    deleteDialog.classList.remove("hidden");

    confirmDeleteButton.onclick = () => {
      deleteOrganization(organizationId);
      loadOrganizationsList();
      showPage("developer-options-page");
      deleteDialog.classList.add("hidden");
    };

    cancelDeleteButton.onclick = () => {
      deleteDialog.classList.add("hidden");
    };
  }
};

const loadProgramEditorPage = (programId) => {
  const program = getProgramById(programId);
  if (!program) return;

  const programEditorPage = document.getElementById("program-editor-page");
  const editorTitle = document.getElementById("editor-title");
  const programLogo = document.getElementById("program-logo");
  const previewProgramName = document.getElementById("preview-program-name");
  const previewOrganizationName = document.getElementById("preview-organization-name");
  const previewDeadline = document.getElementById("preview-deadline");
  const previewCategory = document.getElementById("preview-category");
  const previewStatus = document.getElementById("preview-status");
  const editProgramName = document.getElementById("edit-program-name");
  const editCategory = document.getElementById("edit-category");
  const editDeadline = document.getElementById("edit-deadline");
  const editColor = document.getElementById("edit-color");
  const toggleStatusButton = document.getElementById("toggle-status-button");
  const toggleStatusText = document.getElementById("toggle-status-text");

  if (programEditorPage) programEditorPage.setAttribute("data-program-id", programId);
  if (editorTitle) editorTitle.textContent = program.name;
  if (previewProgramName) previewProgramName.textContent = program.name;
  if (previewOrganizationName) {
    const organization = getOrganizationById(program.organizationId);
    previewOrganizationName.textContent = organization ? organization.name : "Unknown Organization";
  }
  if (previewDeadline) previewDeadline.textContent = program.deadline || "No deadline set";
  if (previewCategory) previewCategory.textContent = program.category || "No category";
  if (previewStatus) {
    previewStatus.textContent = program.status;
    previewStatus.className = `status-badge ${program.status === "Open" ? "status-open" : "status-closed"}`;
  }
  if (editProgramName) editProgramName.value = program.name;
  if (editCategory) editCategory.value = program.category;
  if (editDeadline) editDeadline.value = program.deadline;
  if (editColor) editColor.style.backgroundColor = program.color;

  if (programLogo) {
    const organization = getOrganizationById(program.organizationId);
    programLogo.innerHTML = organization?.logoUrl
      ? `<img src="${organization.logoUrl}" alt="${program.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
  }

  if (toggleStatusButton && toggleStatusText) {
    if (program.status === "Open") {
      toggleStatusText.textContent = "Close Program";
      toggleStatusButton.classList.remove("button-success");
      toggleStatusButton.classList.add("button-danger");
    } else {
      toggleStatusText.textContent = "Open Program";
      toggleStatusButton.classList.remove("button-danger");
      toggleStatusButton.classList.add("button-success");
    }
  }

  // Load detail sections
  loadDetailSections(programId);
  
  // Load form fields
  loadFormFields(programId);

  showPage("program-editor-page");
};

// Function to load detail sections
const loadDetailSections = (programId) => {
  const detailSectionsContainer = document.getElementById("detail-sections-container");
  if (!detailSectionsContainer) return;

  const detailSections = getDetailSections(programId);
  detailSectionsContainer.innerHTML = "";

  if (detailSections.length === 0) {
    detailSectionsContainer.innerHTML = `
      <div class="empty-state">
        <p>No detail sections added yet. Click "Add Detail Section" to create one.</p>
      </div>
    `;
    return;
  }

  detailSections.forEach((section, index) => {
    const sectionElement = document.createElement("div");
    sectionElement.className = "detail-section-card";
    sectionElement.setAttribute("data-section-id", section.id);
    
    let typeBadgeClass = "";
    switch(section.type) {
      case "paragraph": typeBadgeClass = "section-type-paragraph"; break;
      case "list": typeBadgeClass = "section-type-list"; break;
      case "attachment": typeBadgeClass = "section-type-attachment"; break;
      default: typeBadgeClass = ""; break;
    }

    sectionElement.innerHTML = `
      <div class="section-header">
        <div class="section-header-content">
          <span class="section-type-badge ${typeBadgeClass}">${section.type}</span>
          <h3 class="section-label">${section.label}</h3>
          <div class="section-actions">
            <button class="action-button move-up" ${index === 0 ? 'disabled' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button class="action-button move-down" ${index === detailSections.length - 1 ? 'disabled' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button class="action-button edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="action-button delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="section-content">
        ${section.type === 'paragraph' ? `<p>${section.content}</p>` : 
          section.type === 'list' ? `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>` : 
          section.type === 'attachment' ? `<div class="file-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="file-icon">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span class="file-name">${section.fileName || 'No file attached'}</span>
          </div>` : ''}
      </div>
    `;

    // Add event listeners
    sectionElement.querySelector('.edit')?.addEventListener('click', () => {
      showEditDetailSectionDialog(programId, section.id);
    });

    sectionElement.querySelector('.delete')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this section?')) {
        deleteDetailSection(programId, section.id);
        loadDetailSections(programId);
      }
    });

    sectionElement.querySelector('.move-up')?.addEventListener('click', () => {
      if (index > 0) {
        moveDetailSectionUp(programId, section.id);
        loadDetailSections(programId);
      }
    });

    sectionElement.querySelector('.move-down')?.addEventListener('click', () => {
      if (index < detailSections.length - 1) {
        moveDetailSectionDown(programId, section.id);
        loadDetailSections(programId);
      }
    });

    detailSectionsContainer.appendChild(sectionElement);
  });
};

// Function to load form fields
const loadFormFields = (programId) => {
  const formFieldsContainer = document.getElementById("form-fields-container");
  if (!formFieldsContainer) return;

  const formFields = getFormFields(programId);
  formFieldsContainer.innerHTML = "";

  if (formFields.length === 0) {
    formFieldsContainer.innerHTML = `
      <div class="empty-state">
        <p>No form fields added yet. Click "Add Form Field" to create one.</p>
      </div>
    `;
    return;
  }

  formFields.forEach((field, index) => {
    const fieldElement = document.createElement("div");
    fieldElement.className = "form-field-card";
    fieldElement.setAttribute("data-field-id", field.id);
    
    let typeBadgeClass = "";
    switch(field.type) {
      case "short_answer": typeBadgeClass = "field-type-short-answer"; break;
      case "paragraph": typeBadgeClass = "field-type-paragraph"; break;
      case "multiple_choice": typeBadgeClass = "field-type-multiple-choice"; break;
      case "checkbox": typeBadgeClass = "field-type-checkbox"; break;
      case "date": typeBadgeClass = "field-type-date"; break;
      case "attachment": typeBadgeClass = "field-type-attachment"; break;
      default: typeBadgeClass = ""; break;
    }

    fieldElement.innerHTML = `
      <div class="field-header">
        <div class="field-header-content">
          <span class="field-type-badge ${typeBadgeClass}">${field.type.replace('_', ' ')}</span>
          <h3 class="field-label">${field.label}</h3>
          ${field.required ? '<span class="required-badge">Required</span>' : ''}
          <div class="field-actions">
            <button class="action-button move-up" ${index === 0 ? 'disabled' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button class="action-button move-down" ${index === formFields.length - 1 ? 'disabled' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button class="action-button edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="action-button delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="field-content">
        ${field.type === 'short_answer' ? `<input type="text" placeholder="Short answer text" disabled>` : 
          field.type === 'paragraph' ? `<textarea rows="3" placeholder="Long answer text" disabled></textarea>` : 
          field.type === 'multiple_choice' ? `<div class="options-list">
            ${field.options ? field.options.map(option => `
              <div class="radio-option">
                <input type="radio" disabled>
                <label>${option}</label>
              </div>
            `).join('') : '<p>No options defined</p>'}
          </div>` : 
          field.type === 'checkbox' ? `<div class="options-list">
            ${field.options ? field.options.map(option => `
              <div class="checkbox-option">
                <input type="checkbox" disabled>
                <label>${option}</label>
              </div>
            `).join('') : '<p>No options defined</p>'}
          </div>` : 
          field.type === 'date' ? `<input type="date" disabled>` : 
          field.type === 'attachment' ? `<button class="upload-button" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload File
          </button>
          <p class="upload-note">Accepted file types: PDF, DOC, DOCX, JPG, PNG</p>` : ''}
      </div>
    `;

    // Add event listeners
    fieldElement.querySelector('.edit')?.addEventListener('click', () => {
      showEditFormFieldDialog(programId, field.id);
    });

    fieldElement.querySelector('.delete')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this field?')) {
        deleteFormField(programId, field.id);
        loadFormFields(programId);
      }
    });

    fieldElement.querySelector('.move-up')?.addEventListener('click', () => {
      if (index > 0) {
        moveFormFieldUp(programId, field.id);
        loadFormFields(programId);
      }
    });

    fieldElement.querySelector('.move-down')?.addEventListener('click', () => {
      if (index < formFields.length - 1) {
        moveFormFieldDown(programId, field.id);
        loadFormFields(programId);
      }
    });

    formFieldsContainer.appendChild(fieldElement);
  });
};

const showDeleteProgramDialog = (programId) => {
  const deleteProgramDialog = document.getElementById("delete-program-dialog");
  const confirmDeleteProgramButton = document.getElementById("confirm-delete-program");
  const cancelDeleteProgramButton = document.getElementById("cancel-delete-program");

  if (deleteProgramDialog && confirmDeleteProgramButton && cancelDeleteProgramButton) {
    deleteProgramDialog.classList.remove("hidden");

    confirmDeleteProgramButton.onclick = () => {
      const program = getProgramById(programId);
      if (program) {
        deleteProgram(programId);
        loadOrganizationPage(program.organizationId);
      }
      deleteProgramDialog.classList.add("hidden");
    };

    cancelDeleteProgramButton.onclick = () => {
      deleteProgramDialog.classList.add("hidden");
    };
  }
};

const loadPreviewDetailsPage = (programId) => {
  const program = getProgramById(programId);
  if (!program) return;

  const previewDetailsPage = document.getElementById("preview-details-page");
  const previewDetailsLogo = document.getElementById("preview-details-logo");
  const previewDetailsProgramName = document.getElementById("preview-details-program-name");
  const previewDetailsOrganizationName = document.getElementById("preview-details-organization-name");
  const previewDetailsDeadline = document.getElementById("preview-details-deadline");
  const previewDetailsCategory = document.getElementById("preview-details-category");
  const previewDetailSectionsContainer = document.getElementById("preview-detail-sections-container");

  if (previewDetailsProgramName) previewDetailsProgramName.textContent = program.name;
  if (previewDetailsOrganizationName) {
    const organization = getOrganizationById(program.organizationId);
    previewDetailsOrganizationName.textContent = organization ? organization.name : "Unknown Organization";
  }
  if (previewDetailsDeadline) previewDetailsDeadline.textContent = program.deadline || "No deadline set";
  if (previewDetailsCategory) previewDetailsCategory.textContent = program.category || "No category";

  if (previewDetailsLogo) {
    const organization = getOrganizationById(program.organizationId);
    previewDetailsLogo.innerHTML = organization?.logoUrl
      ? `<img src="${organization.logoUrl}" alt="${program.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
  }

  if (previewDetailSectionsContainer) {
    previewDetailSectionsContainer.innerHTML = "";
    const emptyState = previewDetailSectionsContainer.querySelector(".empty-state");

    if (emptyState) {
      emptyState.classList.add("hidden");
    }

    const detailSections = getDetailSections(programId);

    if (detailSections.length === 0) {
      previewDetailSectionsContainer.innerHTML = `
        <div class="empty-state">
          <p>No details available for this program yet.</p>
        </div>
      `;
    } else {
      detailSections.forEach((section) => {
        const sectionElement = document.createElement("div");
        sectionElement.className = "preview-detail-section";
        sectionElement.innerHTML = `
          <h3>${section.label}</h3>
          <div>
            ${section.type === 'paragraph' ? `<p>${section.content}</p>` : 
              section.type === 'list' ? `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>` : 
              section.type === 'attachment' ? `<div class="file-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="file-icon">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span class="file-name">${section.fileName || 'No file attached'}</span>
              </div>` : ''}
          </div>
        `;
        previewDetailSectionsContainer.appendChild(sectionElement);
      });
    }
  }

  showPage("preview-details-page");
};

const loadPreviewFormPage = (programId) => {
  const program = getProgramById(programId);
  if (!program) return;

  const previewFormPage = document.getElementById("preview-form-page");
  const previewFormLogo = document.getElementById("preview-form-logo");
  const previewFormProgramName = document.getElementById("preview-form-program-name");
  const previewFormOrganizationName = document.getElementById("preview-form-organization-name");
  const previewFormDeadline = document.getElementById("preview-form-deadline");
  const previewFormCategory = document.getElementById("preview-form-category");
  const previewFormFieldsContainer = document.getElementById("preview-form-fields-container");

  if (previewFormProgramName) previewFormProgramName.textContent = program.name;
  if (previewFormOrganizationName) {
    const organization = getOrganizationById(program.organizationId);
    previewFormOrganizationName.textContent = organization ? organization.name : "Unknown Organization";
  }
  if (previewFormDeadline) previewFormDeadline.textContent = program.deadline || "No deadline set";
  if (previewFormCategory) previewFormCategory.textContent = program.category || "No category";

  if (previewFormLogo) {
    const organization = getOrganizationById(program.organizationId);
    previewFormLogo.innerHTML = organization?.logoUrl
      ? `<img src="${organization.logoUrl}" alt="${program.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>`;
  }

  if (previewFormFieldsContainer) {
    previewFormFieldsContainer.innerHTML = "";
    const emptyState = previewFormFieldsContainer.querySelector(".empty-state");

    if (emptyState) {
      emptyState.classList.add("hidden");
    }

    const formFields = getFormFields(programId);

    if (formFields.length === 0) {
      previewFormFieldsContainer.innerHTML = `
        <div class="empty-state">
          <p>No form fields defined for this program yet.</p>
        </div>
      `;
    } else {
      formFields.forEach((field) => {
        const fieldElement = document.createElement("div");
        fieldElement.className = "preview-form-field";
        
        let fieldContent = '';
        switch(field.type) {
          case 'short_answer':
            fieldContent = `<input type="text" placeholder="Enter your answer" disabled>`;
            break;
          case 'paragraph':
            fieldContent = `<textarea rows="3" placeholder="Enter your answer" disabled></textarea>`;
            break;
          case 'multiple_choice':
            fieldContent = `<div class="options-list">
              ${field.options ? field.options.map(option => `
                <div class="radio-option">
                  <input type="radio" name="field-${field.id}" disabled>
                  <label>${option}</label>
                </div>
              `).join('') : '<p>No options defined</p>'}
            </div>`;
            break;
          case 'checkbox':
            fieldContent = `<div class="options-list">
              ${field.options ? field.options.map(option => `
                <div class="checkbox-option">
                  <input type="checkbox" disabled>
                  <label>${option}</label>
                </div>
              `).join('') : '<p>No options defined</p>'}
            </div>`;
            break;
          case 'date':
            fieldContent = `<input type="date" disabled>`;
            break;
          case 'attachment':
            fieldContent = `<button class="upload-button" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload File
            </button>
            <p class="upload-note">Accepted file types: PDF, DOC, DOCX, JPG, PNG</p>`;
            break;
        }

        fieldElement.innerHTML = `
          <label>${field.label} ${field.required ? '<span class="form-field-required">*</span>' : ''}</label>
          ${fieldContent}
        `;
        
        previewFormFieldsContainer.appendChild(fieldElement);
      });
    }
  }

  showPage("preview-form-page");
};

const showAddDetailSectionDialog = () => {
  const addDetailSectionDialog = document.getElementById("add-detail-section-dialog");
  const confirmAddDetailSectionButton = document.getElementById("confirm-add-detail-section");
  const cancelAddDetailSectionButton = document.getElementById("cancel-add-detail-section");
  const detailSectionTypeSelect = document.getElementById("detail-section-type");

  if (
    addDetailSectionDialog &&
    confirmAddDetailSectionButton &&
    cancelAddDetailSectionButton &&
    detailSectionTypeSelect
  ) {
    addDetailSectionDialog.classList.remove("hidden");

    confirmAddDetailSectionButton.onclick = () => {
      const sectionType = detailSectionTypeSelect.value;
      const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
      
      if (programId) {
        // Create a new section based on the selected type
        const newSection = {
          id: "section" + Date.now(),
          type: sectionType,
          label: sectionType === 'paragraph' ? 'About the Program' : 
                 sectionType === 'list' ? 'Requirements' : 'Program Documents',
          content: sectionType === 'paragraph' ? 'Enter program details here.' : '',
          items: sectionType === 'list' ? ['Requirement 1', 'Requirement 2'] : [],
          fileName: sectionType === 'attachment' ? 'program-details.pdf' : ''
        };
        
        addDetailSection(programId, newSection);
        loadDetailSections(programId);
      }
      
      addDetailSectionDialog.classList.add("hidden");
    };

    cancelAddDetailSectionButton.onclick = () => {
      addDetailSectionDialog.classList.add("hidden");
    };
  }
};

const showAddFormFieldDialog = () => {
  const addFormFieldDialog = document.getElementById("add-form-field-dialog");
  const confirmAddFormFieldButton = document.getElementById("confirm-add-form-field");
  const cancelAddFormFieldButton = document.getElementById("cancel-add-form-field");
  const formFieldTypeSelect = document.getElementById("form-field-type");

  if (addFormFieldDialog && confirmAddFormFieldButton && cancelAddFormFieldButton && formFieldTypeSelect) {
    addFormFieldDialog.classList.remove("hidden");

    confirmAddFormFieldButton.onclick = () => {
      const fieldType = formFieldTypeSelect.value;
      const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
      
      if (programId) {
        // Create a new field based on the selected type
        const newField = {
          id: "field" + Date.now(),
          type: fieldType,
          label: fieldType === 'short_answer' ? 'Full Name' : 
                 fieldType === 'paragraph' ? 'Tell us about yourself' : 
                 fieldType === 'multiple_choice' ? 'Select an option' :
                 fieldType === 'checkbox' ? 'Select all that apply' :
                 fieldType === 'date' ? 'Select a date' : 'Upload a document',
          required: true,
          options: (fieldType === 'multiple_choice' || fieldType === 'checkbox') ? 
                   ['Option 1', 'Option 2', 'Option 3'] : []
        };
        
        addFormField(programId, newField);
        loadFormFields(programId);
      }
      
      addFormFieldDialog.classList.add("hidden");
    };

    cancelAddFormFieldButton.onclick = () => {
      addFormFieldDialog.classList.add("hidden");
    };
  }
};

const moveDetailSectionUp = (programId, sectionId) => {
  const program = getProgramById(programId);
  if (program && program.detailSections) {
    const index = program.detailSections.findIndex(section => section.id === sectionId);
    if (index > 0) {
      // Swap with the previous section
      [program.detailSections[index], program.detailSections[index - 1]] = 
      [program.detailSections[index - 1], program.detailSections[index]];
      updateProgram(program);
    }
  }
};

const moveDetailSectionDown = (programId, sectionId) => {
  const program = getProgramById(programId);
  if (program && program.detailSections) {
    const index = program.detailSections.findIndex(section => section.id === sectionId);
    if (index < program.detailSections.length - 1) {
      // Swap with the next section
      [program.detailSections[index], program.detailSections[index + 1]] = 
      [program.detailSections[index + 1], program.detailSections[index]];
      updateProgram(program);
    }
  }
};

const moveFormFieldUp = (programId, fieldId) => {
  const program = getProgramById(programId);
  if (program && program.formFields) {
    const index = program.formFields.findIndex(field => field.id === fieldId);
    if (index > 0) {
      // Swap with the previous field
      [program.formFields[index], program.formFields[index - 1]] = 
      [program.formFields[index - 1], program.formFields[index]];
      updateProgram(program);
    }
  }
};

const moveFormFieldDown = (programId, fieldId) => {
  const program = getProgramById(programId);
  if (program && program.formFields) {
    const index = program.formFields.findIndex(field => field.id === fieldId);
    if (index < program.formFields.length - 1) {
      // Swap with the next field
      [program.formFields[index], program.formFields[index + 1]] = 
      [program.formFields[index + 1], program.formFields[index]];
      updateProgram(program);
    }
  }
};

const showEditDetailSectionDialog = (programId, sectionId) => {
  const editDetailSectionDialog = document.getElementById("edit-detail-section-dialog");
  const confirmEditDetailSectionButton = document.getElementById("confirm-edit-detail-section");
  const cancelEditDetailSectionButton = document.getElementById("cancel-edit-detail-section");
  const editSectionTypeSelect = document.getElementById("edit-section-type");
  const editSectionLabelInput = document.getElementById("edit-section-label");
  const editSectionContentContainer = document.getElementById("edit-section-content-container");
  const editSectionContentTextarea = document.getElementById("edit-section-content");

  if (
    editDetailSectionDialog &&
    confirmEditDetailSectionButton &&
    cancelEditDetailSectionButton &&
    editSectionTypeSelect &&
    editSectionLabelInput &&
    editSectionContentContainer &&
    editSectionContentTextarea
  ) {
    editDetailSectionDialog.classList.remove("hidden");

    // Get the section data
    const program = getProgramById(programId);
    const section = program?.detailSections?.find(s => s.id === sectionId);

    if (section) {
      editSectionTypeSelect.value = section.type;
      editSectionLabelInput.value = section.label;

      // Show/hide content textarea based on section type
      if (section.type === "paragraph") {
        editSectionContentContainer.classList.remove("hidden");
        editSectionContentTextarea.value = section.content || '';
      } else if (section.type === "list") {
        editSectionContentContainer.classList.remove("hidden");
        editSectionContentTextarea.value = section.items ? section.items.join('\n') : '';
      } else {
        editSectionContentContainer.classList.add("hidden");
      }

      confirmEditDetailSectionButton.onclick = () => {
        const updatedSection = {
          ...section,
          label: editSectionLabelInput.value
        };

        if (section.type === "paragraph") {
          updatedSection.content = editSectionContentTextarea.value;
        } else if (section.type === "list") {
          updatedSection.items = editSectionContentTextarea.value
            .split('\n')
            .filter(item => item.trim() !== '');
        }

        updateDetailSection(programId, sectionId, updatedSection);
        loadDetailSections(programId);
        editDetailSectionDialog.classList.add("hidden");
      };
    }

    cancelEditDetailSectionButton.onclick = () => {
      editDetailSectionDialog.classList.add("hidden");
    };
  }
};

const showEditFormFieldDialog = (programId, fieldId) => {
  const editFormFieldDialog = document.getElementById("edit-form-field-dialog");
  const confirmEditFormFieldButton = document.getElementById("confirm-edit-form-field");
  const cancelEditFormFieldButton = document.getElementById("cancel-edit-form-field");
  const editFieldTypeSelect = document.getElementById("edit-field-type");
  const editFieldLabelInput = document.getElementById("edit-field-label");
  const editFieldRequiredCheckbox = document.getElementById("edit-field-required");
  const editFieldOptionsContainer = document.getElementById("edit-field-options-container");
  const editFieldOptionsList = document.getElementById("edit-field-options-list");
  const addFieldOptionButton = document.getElementById("add-field-option");

  if (
    editFormFieldDialog &&
    confirmEditFormFieldButton &&
    cancelEditFormFieldButton &&
    editFieldTypeSelect &&
    editFieldLabelInput &&
    editFieldRequiredCheckbox
  ) {
    editFormFieldDialog.classList.remove("hidden");

    // Get the field data
    const program = getProgramById(programId);
    const field = program?.formFields?.find(f => f.id === fieldId);

    if (field) {
      editFieldTypeSelect.value = field.type;
      editFieldLabelInput.value = field.label;
      editFieldRequiredCheckbox.checked = field.required;

      // Show/hide options container based on field type
      if (editFieldOptionsContainer && editFieldOptionsList && addFieldOptionButton) {
        if (field.type === "multiple_choice" || field.type === "checkbox") {
          editFieldOptionsContainer.classList.remove("hidden");
          
          // Populate options list
          editFieldOptionsList.innerHTML = '';
          if (field.options && field.options.length > 0) {
            field.options.forEach((option, index) => {
              const optionItem = document.createElement('div');
              optionItem.className = 'list-item';
              optionItem.innerHTML = `
                <span class="list-item-bullet">•</span>
                <input type="text" class="list-item-input" value="${option}">
                <button type="button" class="list-item-remove" ${field.options.length <= 1 ? 'disabled' : ''}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `;
              
              // Add event listener to remove button
              optionItem.querySelector('.list-item-remove')?.addEventListener('click', function() {
                if (editFieldOptionsList.children.length > 1) {
                  optionItem.remove();
                  // Update disabled state on remaining remove buttons
                  if (editFieldOptionsList.children.length <= 1) {
                    editFieldOptionsList.querySelector('.list-item-remove')?.setAttribute('disabled', '');
                  }
                }
              });
              
              editFieldOptionsList.appendChild(optionItem);
            });
          } else {
            // Add a default option if none exist
            const optionItem = document.createElement('div');
            optionItem.className = 'list-item';
            optionItem.innerHTML = `
              <span class="list-item-bullet">•</span>
              <input type="text" class="list-item-input" value="Option 1">
              <button type="button" class="list-item-remove" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `;
            editFieldOptionsList.appendChild(optionItem);
          }
          
          // Add event listener to add option button
          addFieldOptionButton.onclick = function() {
            const optionItem = document.createElement('div');
            optionItem.className = 'list-item';
            optionItem.innerHTML = `
              <span class="list-item-bullet">•</span>
              <input type="text" class="list-item-input" value="New Option">
              <button type="button" class="list-item-remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `;
            
            // Add event listener to remove button
            optionItem.querySelector('.list-item-remove')?.addEventListener('click', function() {
              optionItem.remove();
              // Update disabled state on remaining remove buttons
              if (editFieldOptionsList.children.length <= 1) {
                editFieldOptionsList.querySelector('.list-item-remove')?.setAttribute('disabled', '');
              }
            });
            
            editFieldOptionsList.appendChild(optionItem);
            
            // Enable all remove buttons if we have more than one option
            if (editFieldOptionsList.children.length > 1) {
              editFieldOptionsList.querySelectorAll('.list-item-remove').forEach(button => {
                button.removeAttribute('disabled');
              });
            }
          };
        } else {
          editFieldOptionsContainer.classList.add("hidden");
        }
      }

      confirmEditFormFieldButton.onclick = () => {
        const updatedField = {
          ...field,
          label: editFieldLabelInput.value,
          required: editFieldRequiredCheckbox.checked
        };

        // Get options if applicable
        if ((field.type === "multiple_choice" || field.type === "checkbox") && editFieldOptionsList) {
          updatedField.options = Array.from(editFieldOptionsList.querySelectorAll('.list-item-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');
        }

        updateFormField(programId, fieldId, updatedField);
        loadFormFields(programId);
        editFormFieldDialog.classList.add("hidden");
      };
    }

    cancelEditFormFieldButton.onclick = () => {
      editFormFieldDialog.classList.add("hidden");
    };
  }
};

// Load profile data from localStorage
const updateProfile = () => {
  const avatarDisplay = document.getElementById("avatarDisplay");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const defaultUsername = "username";
  const defaultAvatar = 'assets/Profile_Default.png'; // Ensure this path is correct

  const savedUsername = localStorage.getItem("username") || defaultUsername;
  const savedAvatar = localStorage.getItem("avatar") || defaultAvatar;

  if (usernameDisplay) {
    usernameDisplay.textContent = savedUsername;
  }
  if (avatarDisplay) {
    avatarDisplay.src = savedAvatar;
    avatarDisplay.onerror = () => {
      avatarDisplay.src = defaultAvatar; // Fallback to default avatar
    };
  }
};

// Show page function
const showPage = (pageId) => {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  // Show the requested page
  document.getElementById(pageId)?.classList.remove("hidden");
};

// Load organizations list
const loadOrganizationsList = () => {
  const organizationsList = document.getElementById("organizations-list");
  if (!organizationsList) return;

  const organizations = getOrganizations();
  organizationsList.innerHTML = "";

  if (organizations.length === 0) {
    organizationsList.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <p class="empty-title">No organizations found</p>
        <p class="empty-subtitle">Create a new organization to get started</p>
      </div>
    `;
    return;
  }

  organizations.forEach((org) => {
    const orgElement = document.createElement("div");
    orgElement.className = "organization-item";
    orgElement.innerHTML = `
      <div class="organization-logo">
        ${
          org.logoUrl
            ? `<img src="${org.logoUrl}" alt="${org.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>`
        }
      </div>
      <div class="organization-info">
        <div class="organization-name">${org.name}</div>
        <div class="organization-website">${org.website}</div>
      </div>
      <button class="delete-button" data-id="${org.id}" aria-label="Delete organization">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    `;

    // Add click event to navigate to organization page
    orgElement.querySelector(".organization-info")?.addEventListener("click", () => {
      loadOrganizationPage(org.id);
    });

    // Add click event to delete button
    orgElement.querySelector(".delete-button")?.addEventListener("click", (e) => {
      e.stopPropagation();
      showDeleteDialog(org.id);
    });

    organizationsList.appendChild(orgElement);
  });
};

// Setup tab navigation
const setupTabNavigation = () => {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      const tabContainer = button.closest(".tabs");

      if (tabContainer) {
        // Deactivate all tabs in this container
        tabContainer.querySelectorAll(".tab-button").forEach((btn) => {
          btn.classList.remove("active");
        });

        // Activate the clicked tab
        button.classList.add("active");

        // Find the parent section
        const section = tabContainer.closest("section");
        if (section) {
          // Hide all tab content in this section
          section.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
          });

          // Show the selected tab content
          section.querySelector(`#${tabId}-tab`)?.classList.add("active");
        }
      }
    });
  });
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Clear localStorage if it contains example data
  localStorage.removeItem("organizations");
  localStorage.removeItem("programs");

  // Update profile
  updateProfile();

  // Setup tab navigation
  setupTabNavigation();

  // Load organizations list
  loadOrganizationsList();

  // Show organization management page by default
  showPage("developer-options-page");
});

const showOrganizationCreatedModal = () => {
  const modal = document.getElementById("organization-created-modal");
  if (modal) {
    modal.classList.remove("hidden");
    const closeButton = document.getElementById("close-organization-modal");
    if (closeButton) {
      closeButton.onclick = () => {
        modal.classList.add("hidden");
      };
    }
  }
};

// Setup form submission for creating organizations
const createOrganizationForm = document.getElementById("create-organization-form");
if (createOrganizationForm) {
  createOrganizationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitButton = createOrganizationForm.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const buttonText = submitButton.querySelector(".button-text");
    const buttonLoader = submitButton.querySelector(".button-loader");
    if (!buttonText || !buttonLoader) return;

    // Show loading state
    buttonText.classList.add("hidden");
    buttonLoader.classList.remove("hidden");
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(createOrganizationForm);
    const newOrganization = {
      id: "org" + Date.now(),
      name: formData.get("name"),
      logoUrl: formData.get("logoUrl"),
      website: formData.get("website"),
    };

    // Simulate API call delay
    setTimeout(() => {
      // Add organization to data
      addOrganization(newOrganization);

      // Reset form
      createOrganizationForm.reset();

      // Hide loading state
      buttonText.classList.remove("hidden");
      buttonLoader.classList.add("hidden");
      submitButton.disabled = false;

      // Show success modal
      showOrganizationCreatedModal();

      // Reload organizations list
      loadOrganizationsList();
    }, 1000);
  });
}

// Setup event listeners
document.getElementById("back-button-program")?.addEventListener("click", () => {
  const currentProgramId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
  if (currentProgramId) {
    const program = getProgramById(currentProgramId);
    if (program) {
      loadOrganizationPage(program.organizationId);
    }
  }
});

document.getElementById("back-button-preview-details")?.addEventListener("click", () => {
  showPage("program-editor-page");
});

document.getElementById("back-button-preview-form")?.addEventListener("click", () => {
  showPage("program-editor-page");
});

document.getElementById("preview-details-button")?.addEventListener("click", () => {
  const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
  if (programId) {
    loadPreviewDetailsPage(programId);
  }
});

document.getElementById("preview-form-button")?.addEventListener("click", () => {
  const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
  if (programId) {
    loadPreviewFormPage(programId);
  }
});

document.getElementById("add-detail-section-button")?.addEventListener("click", () => {
  showAddDetailSectionDialog();
});

document.getElementById("add-form-field-button")?.addEventListener("click", () => {
  showAddFormFieldDialog();
});

document.getElementById("edit-color")?.addEventListener("click", () => {
  const colorPickerDialog = document.getElementById("color-picker-dialog");
  if (colorPickerDialog) {
    colorPickerDialog.classList.remove("hidden");

    // Generate color options if they don't exist
    const colorPickerGrid = document.getElementById("color-picker-grid");
    if (colorPickerGrid && colorPickerGrid.children.length === 0) {
      const colors = [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
        "#008000",
        "#800000",
        "#000080",
        "#808000",
        "#008080",
        "#808080",
        "#C0C0C0",
      ];

      colors.forEach((color) => {
        const colorOption = document.createElement("div");
        colorOption.className = "color-option";
        colorOption.style.backgroundColor = color;
        colorOption.setAttribute("data-color", color);
        colorOption.addEventListener("click", () => {
          const editColor = document.getElementById("edit-color");
          if (editColor) {
            editColor.style.backgroundColor = color;
            editColor.innerHTML = `<span>Tap to change color</span>`; // Display "Tap to change color"

            // Update program color
            const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
            if (programId) {
              const program = getProgramById(programId);
              if (program) {
                program.color = color;
                updateProgram(program);
              }
            }
          }
          colorPickerDialog.classList.add("hidden");
        });

        colorPickerGrid.appendChild(colorOption);
      });
    }
  }
});

document.getElementById("toggle-status-button")?.addEventListener("click", () => {
  const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
  if (programId) {
    const program = getProgramById(programId);
    if (program) {
      program.status = program.status === "Open" ? "Closed" : "Open";
      updateProgram(program);
      loadProgramEditorPage(programId);
    }
  }
});

document.getElementById("save-button")?.addEventListener("click", () => {
  const programId = document.getElementById("program-editor-page")?.getAttribute("data-program-id");
  if (programId) {
    const program = getProgramById(programId);
    if (program) {
      const editProgramName = document.getElementById("edit-program-name");
      const editCategory = document.getElementById("edit-category");
      const editDeadline = document.getElementById("edit-deadline");

      if (editProgramName) program.name = editProgramName.value;
      if (editCategory) program.category = editCategory.value;
      if (editDeadline) program.deadline = editDeadline.value;

      updateProgram(program);
      loadProgramEditorPage(programId);

      // Show success message
      alert("Program saved successfully!");
    }
  }
});

// Setup confirm add program button
document.getElementById("confirm-add-program")?.addEventListener("click", () => {
  const addProgramForm = document.getElementById("add-program-form");
  if (addProgramForm) {
    const organizationId = addProgramForm.getAttribute("data-organization-id");
    const programName = document.getElementById("program-name")?.value;
    const category = document.getElementById("category")?.value;
    const deadline = document.getElementById("deadline")?.value;

    // Get selected color or default to blue
    let selectedColor = "#0000FF";
    const colorPicker = document.getElementById("color-picker");
    if (colorPicker) {
      const selectedColorOption = colorPicker.querySelector(".color-option.selected");
      if (selectedColorOption) {
        selectedColor = selectedColorOption.getAttribute("data-color") || selectedColor;
      }
    }

    if (organizationId && programName && category && deadline) {
      const newProgram = {
        id: "prog" + Date.now(),
        organizationId: organizationId,
        name: programName,
        category: category,
        deadline: deadline,
        color: selectedColor,
        status: "Open",
      };

      addProgram(newProgram);

      // Close dialog
      document.getElementById("add-program-dialog")?.classList.add("hidden");

      // Reset form
      addProgramForm.reset();

      // Reload organization page
      loadOrganizationPage(organizationId);
    } else {
      alert("Please fill in all required fields");
    }
  }
});

// Setup cancel add program button
document.getElementById("cancel-add-program")?.addEventListener("click", () => {
  document.getElementById("add-program-dialog")?.classList.add("hidden");
});

// Initialize color picker in add program dialog
const colorPicker = document.getElementById("color-picker");
if (colorPicker && colorPicker.children.length === 0) {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
  ];

  colors.forEach((color) => {
    const colorOption = document.createElement("div");
    colorOption.className = "color-option";
    colorOption.style.backgroundColor = color;
    colorOption.setAttribute("data-color", color);
    colorOption.addEventListener("click", () => {
      // Remove selected class from all options
      colorPicker.querySelectorAll(".color-option").forEach((option) => {
        option.classList.remove("selected");
      });

      // Add selected class to clicked option
      colorOption.classList.add("selected");
    });

    colorPicker.appendChild(colorOption);
  });

  // Select first color by default
  colorPicker.querySelector(".color-option")?.classList.add("selected");
}

// Show organization management page by default
showPage("developer-options-page");

const loadProgramsByOrganization = (organizationId) => {
  const programs = getProgramsByOrganization(organizationId);
  const programsList = document.getElementById("programs-list");

  if (programsList) {
    programsList.innerHTML = "";

    programs.forEach((program) => {
      const programElement = document.createElement("div");
      programElement.className = "program-item";

      programElement.innerHTML = `
        <div class="program-logo">
          <img src="${program.logoUrl || ''}" alt="${program.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/40';">
        </div>
        <div class="program-info">
          <h3 class="program-name">${program.name}</h3>
          <p class="program-category">${program.category || "No category"}</p>
          <p class="program-due-date">Due: ${program.deadline || "No deadline set"}</p>
        </div>
        <button class="delete-button">Delete</button>
      `;

      programsList.appendChild(programElement);
    });
  }
};

// Add error handling for all DOM operations
const safeQuerySelector = (parent, selector) => {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.error(`Error querying selector ${selector}:`, error);
    return null;
  }
};

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Prevent the error from breaking the entire application
  event.preventDefault();
});

// Allow Admin to Upload Attachments in Details
const showAddAttachmentDialog = (programId) => {
  const addAttachmentDialog = document.getElementById("add-attachment-dialog");
  const confirmAddAttachmentButton = document.getElementById("confirm-add-attachment");
  const cancelAddAttachmentButton = document.getElementById("cancel-add-attachment");
  const attachmentInput = document.getElementById("attachment-input");

  if (addAttachmentDialog && confirmAddAttachmentButton && cancelAddAttachmentButton && attachmentInput) {
    addAttachmentDialog.classList.remove("hidden");

    confirmAddAttachmentButton.onclick = () => {
      const file = attachmentInput.files[0];
      if (file) {
        const program = getProgramById(programId);
        if (program) {
          const newAttachment = {
            id: "attachment" + Date.now(),
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
          };

          program.detailSections = program.detailSections || [];
          program.detailSections.push({
            id: "section" + Date.now(),
            type: "attachment",
            label: "Uploaded Attachment",
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
          });

          updateProgram(program);
          loadDetailSections(programId);
        }
      }

      addAttachmentDialog.classList.add("hidden");
    };

    cancelAddAttachmentButton.onclick = () => {
      addAttachmentDialog.classList.add("hidden");
    };
  }
};