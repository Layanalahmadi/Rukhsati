// Get all step indicators
const stepIndicators = document.querySelectorAll('.step-indicator');

// Get all form steps
const formSteps = document.querySelectorAll('.form-step');

// Get the next button
const nextButton = document.querySelector('.next-step');

// Get the go back button
const goBackButton = document.querySelector('.go-back-button');

// Get the go back button
const goBackButton1 = document.querySelector('.go-back-button1');

// Get the submit button
const submitButton = document.querySelector('.submit-button');

// Get the done button
const doneButton = document.querySelector('.done-button');

// Initialize current step
let currentStep = 0;

// Function to show current step and hide others
function showStep(stepIndex) {
  // Hide all form steps
  formSteps.forEach((step) => {
    step.style.display = 'none';
  });
  
  // Show the current step
  formSteps[stepIndex].style.display = 'block';

  // Update current step
  currentStep = stepIndex;

  // Show or hide next button based on the current step
  if (currentStep === formSteps.length - 1) {
    nextButton.style.display = 'none'; // Hide next button on last step
  } else {
    nextButton.style.display = 'block';
  }
  // Show or hide go back button based on the current step
  if (currentStep === 0) {
    goBackButton.style.display = 'none'; // Hide go back button on first step
    goBackButton1.style.display = 'none';
  } else {
    goBackButton.style.display = 'block';
    goBackButton1.style.display = 'block';
  }
   // Show or hide go back button based on the current step
   if (currentStep === 4) {
    submitButton.style.display = 'block'; // Show submit button on last step
  } else {
    submitButton.style.display = 'none';
  }
  if (currentStep === 4) {
    nextButton.style.display = 'none'; 
    goBackButton1.style.display = 'none'; 
  } else {
    nextButton.style.display = 'block';
  }
  if (currentStep === 5) {
    doneButton.style.display = 'block'; 
    nextButton.style.display = 'none';
    goBackButton.style.display = 'none';
    goBackButton1.style.display = 'none';
  } else {
    doneButton.style.display = 'none';
}

}

// Show the initial step (Step 1)
showStep(currentStep);

// Function to handle next button click
nextButton.addEventListener('click', () => {
  // Check if the current step is valid
  if (isStepValid(currentStep)) {
    // Increment current step by 1
    currentStep++;
    // Show the next step
    showStep(currentStep);

    // Update step indicators
    updateStepIndicators();
  } else {
    // Display an error message or indicator to prompt the user to fill in required fields
    console.log('Please fill in all required fields before proceeding.');
  }
});


// Function to handle go back button click
goBackButton.addEventListener('click', () => {
  // Decrement current step by 1
  currentStep--;
  // Show the previous step
  showStep(currentStep);

  // Update step indicators
  updateStepIndicators();
});
// Function to handle go back button click
goBackButton1.addEventListener('click', () => {
  // Decrement current step by 1
  currentStep--;
  // Show the previous step
  showStep(currentStep);

  // Update step indicators
  updateStepIndicators();
});

// Function to handle submit button click
submitButton.addEventListener('click', () => {
  // Check if the current step is valid
  if (isStepValid(currentStep)) {
    // Increment current step by 1
    currentStep++;
    // Show the next step
    showStep(currentStep);

    // Update step indicators
    updateStepIndicators();
  } else {
    // Display an error message or indicator to prompt the user to fill in required fields
    console.log('Please fill in all required fields before proceeding.');
  }
});

// Function to handle done button click
doneButton.addEventListener('click', () => {
    // Change the URL to the desired page
    window.location.href = 'landingPage.html';
});

// Function to update step indicators
function updateStepIndicators() {
  // Remove 'active' class from all step indicators
  stepIndicators.forEach((step) => {
    step.classList.remove('active');
  });

  // Add 'active' class to the current step indicator
  stepIndicators[currentStep].classList.add('active');

  // Scroll to the corresponding step indicator
  stepIndicators[currentStep].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to check if the current step is valid
function isStepValid(stepIndex) {
  const inputs = formSteps[stepIndex].querySelectorAll('input[required], select[required]');
  for (const input of inputs) {
    if (!input.value.trim()) {
      return false; // Return false if any required input is empty
    }
  }
  return true; // Return true if all required inputs are filled
}

// Add event listener to step indicators
stepIndicators.forEach((step, index) => {
  step.addEventListener('click', () => {
    // Show the corresponding form step
    showStep(index);

    // Update step indicators
    updateStepIndicators();
  });
});


//Validation 
function isStepValid(stepIndex) {
  const inputs = formSteps[stepIndex].querySelectorAll('input[required], select[required]');
  let isValid = true;

  // Loop through each input field
  inputs.forEach(input => {
    if (!input.value.trim()) {
      // If input is empty, add red border
      input.style.borderColor = 'red';
      isValid = false;
    } else {
      // If input is not empty, remove red border (if previously set)
      input.style.borderColor = ''; // Set to default
    }
  });

  return isValid;
}

//validaton STEP 1
// Get all input elements
const nameInput = document.getElementById('name');
const nameInputError = document.getElementById('nameInputError');

const phoneInput = document.getElementById('phone');
const phoneInputError = document.getElementById('phoneInputError');

const positionInput1 = document.getElementById('position1');
const positionInput2 = document.getElementById('position2');
const positionError = document.getElementById('position-error');

const commRegisterInput = document.getElementById('trade-licence');
const commRegisterInputError = document.getElementById('commRegisterInputError');

const facilityNameInput = document.getElementById('company-name');
const facilityNameInputError = document.getElementById('facilityNameInputError');

const facilityNumberInput = document.getElementById('company-number');
const facilityNumberInputError = document.getElementById('facilityNumberInputError');


const next1 = document.querySelector('.next-step');

// Add a click event listener to the "Next" button
next1.addEventListener('click', function(event) {

    if (!validateFormstep1()) {
        event.preventDefault();
    }
});

// Function to validate 
function validateFormstep1() {
    let isValid = true;

// Validation for name
if (!nameInput.value) {
  nameInput.classList.add('is-invalid');
  nameInputError.innerText = "هذا الحقل مطلوب";
  isValid = false;
} else if (!/^[أ-ي\s]+$/.test(nameInput.value)) { 
  nameInput.classList.add('is-invalid');
  nameInputError.innerText = "يجب ان يحتوي على احرف عربية فقط";
  isValid = false;
} else {
  // Check if the input contains at least three words
  const words = nameInput.value.split(/\s+/).filter(word => word.trim() !== '');
  if (words.length < 3) {
      nameInput.classList.add('is-invalid');
      nameInputError.innerText = "يجب ان يكون الاسم ثلاثي";
      isValid = false;
  } else {
      nameInput.classList.remove('is-invalid');
      nameInputError.innerText = "";
  }
}
    // Validation for phone number
if (!phoneInput.value) {
  phoneInput.classList.add('is-invalid');
  phoneInputError.innerText = "هذا الحقل مطلوب";
  isValid = false;
} else if (!/^\d+$/.test(phoneInput.value)) {
  phoneInput.classList.add('is-invalid');
  phoneInputError.innerText = "يجب أن يحتوي على أرقام فقط";
  isValid = false;
} else {
  phoneInput.classList.remove('is-invalid');
  phoneInputError.innerText = "";
}
 
// Validation for radio button


if (!positionInput1.checked && !positionInput2.checked) {
  positionError.innerText = "يجب اختيار خيار واحد على الأقل";
  isValid = false;
} else {
  positionError.innerText = "";
}

    // Validation for commRegister
    if (!commRegisterInput.value) {
      commRegisterInput.classList.add('is-invalid');
      commRegisterInputError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^\d+$/.test(commRegisterInput.value)) {
        commRegisterInput.classList.add('is-invalid');
        commRegisterInputError.innerText = "يجب أن يحتوي على أرقام فقط";
        isValid = false;
      } else {
        commRegisterInput.classList.remove('is-invalid');
        commRegisterInputError.innerText = "";
      }

    // Validation for facilit Name
    if (!facilityNameInput.value) {
      facilityNameInput.classList.add('is-invalid');
      facilityNameInputError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^[أ-ي]+$/.test(facilityNameInput.value)) { 
      facilityNameInput.classList.add('is-invalid');
      facilityNameInputError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
      facilityNameInput.classList.remove('is-invalid');
      facilityNameInputError.innerText = "";
    }
    
    // Validation for facility Number
    if (!facilityNumberInput.value) {
      facilityNumberInput.classList.add('is-invalid');
      facilityNumberInputError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^\d+$/.test(facilityNumberInput.value)) {
        facilityNumberInput.classList.add('is-invalid');
        facilityNumberInputError.innerText = "يجب أن يحتوي على أرقام فقط";
        isValid = false;
      } else {
        facilityNumberInput.classList.remove('is-invalid');
        facilityNumberInputError.innerText = "";
      }

    

    return isValid;
}


//validaton STEP 2
// Get all input elements
const activityInput = document.getElementById('activity-name');
const activityInputError = document.getElementById('activityInputError');

const totalAreaInput = document.getElementById('total-area');
const totalAreaInputError = document.getElementById('totalAreaInputError');

const positionInput3 = document.getElementById('position3');
const positionInput4 = document.getElementById('position4');
const positionInput5 = document.getElementById('position5');
const positionError2 = document.getElementById('position--error');


const next2 = document.querySelector('.next-step');

// Add a click event listener to the "Next" button
next2.addEventListener('click', function(event) {

    if (!validateFormstep2()) {
        event.preventDefault();
    }
});

// Function to validate 
function validateFormstep2() {
    let isValid = true;

    // Validation for activity type
    if (!activityInput.value) {
      activityInput.classList.add('is-invalid');
      activityInputError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^[أ-ي]+$/.test(activityInput.value)) { 
        activityInput.classList.add('is-invalid');
        activityInputError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
      activityInput.classList.remove('is-invalid');
      activityInputError.innerText = "";
    }

    // Validation for total area
if (!totalAreaInput.value) {
  totalAreaInput.classList.add('is-invalid');
  totalAreaInputError.innerText = "هذا الحقل مطلوب";
  isValid = false;
} else if (!/^\d+$/.test(totalAreaInput.value)) {
  totalAreaInput.classList.add('is-invalid');
  totalAreaInputError.innerText = "يجب أن يحتوي على أرقام فقط";
  isValid = false;
} else {
  totalAreaInput.classList.remove('is-invalid');
  totalAreaInputError.innerText = "";
}
 
if (!positionInput3.checked && !positionInput4.checked && !positionInput5.checked) {
  positionError2.innerText = "يجب اختيار خيار واحد على الأقل";
  isValid = false;
} else {
  positionError2.innerText = "";
}
    return isValid;
}

//validaton STEP 3
// Get all input elements
const regionInput = document.getElementById('Region');
const regionError = document.getElementById('regionError');

const alamanaInput = document.getElementById('Alamana');
const alamanaError = document.getElementById('alamanaError');

const municipalityInput = document.getElementById('Municipality');
const municipalityError = document.getElementById('municipalityError');

const districtInput = document.getElementById('District');
const districtError = document.getElementById('districtError');

const streetInput = document.getElementById('Street');
const streetError = document.getElementById('streetError');

const planNumberInput = document.getElementById('planNumber');
const planNumberError = document.getElementById('planNumberError');

const plotNumberInput = document.getElementById('PlotNumber');
const plotNumberError = document.getElementById('plotNumberError');


const next3 = document.querySelector('.next-step'); 

// Add a click event listener to the "Next" button for Step 3
next3.addEventListener('click', function(event) {
    if (!validateFormStep3()) { // Ensure to call validateForm1() for Step 3
        event.preventDefault();
    }
});

// Function to validate 
function validateFormStep3() {
    let isValid = true;

    // Validation for Region
    if (!regionInput.value) {
        regionInput.classList.add('is-invalid');
        regionError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^[أ-ي]+$/.test(regionInput.value)) { 
        regionInput.classList.add('is-invalid');
        regionError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
        regionInput.classList.remove('is-invalid');
        regionError.innerText = "";
    }

    // Validation for Alamana
    if (!alamanaInput.value) {
        alamanaInput.classList.add('is-invalid');
        alamanaError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^[أ-ي]+$/.test(alamanaInput.value)) { 
      alamanaInput.classList.add('is-invalid');
      alamanaError.innerText = "يجب ان يحتوي على احرف عربية فقط";
      isValid = false;
    }  else {
      alamanaInput.classList.remove('is-invalid');
      alamanaError.innerText = "";
    }

    // Validation for Municipality
    if (!municipalityInput.value) {
        municipalityInput.classList.add('is-invalid');
        municipalityError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^[أ-ي]+$/.test(municipalityInput.value)) { 
        municipalityInput.classList.add('is-invalid');
        municipalityError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
        municipalityInput.classList.remove('is-invalid');
        municipalityError.innerText = "";
    }

    // Validation for District
    if (!districtInput.value) {
        districtInput.classList.add('is-invalid');
        districtError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^[أ-ي]+$/.test(districtInput.value)) { 
        districtInput.classList.add('is-invalid');
        districtError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
        districtInput.classList.remove('is-invalid');
        districtError.innerText = "";
    }
    
    // Validation for Street
    if (!streetInput.value) {
        streetInput.classList.add('is-invalid');
        streetError.innerText = "هذا الحقل مطلوب";
        isValid = false;
      } else if (!/^[أ-ي]+$/.test(streetInput.value)) { 
        streetInput.classList.add('is-invalid');
        streetError.innerText = "يجب ان يحتوي على احرف عربية فقط";
        isValid = false;
    } else {
        streetInput.classList.remove('is-invalid');
        streetError.innerText = "";
    }

    // Validation for Plan Number
    if (!planNumberInput.value) {
        planNumberInput.classList.add('is-invalid');
        planNumberError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^\d+$/.test(planNumberInput.value)) { 
      planNumberInput.classList.add('is-invalid');
      planNumberError.innerText = "رقم المخطط يجب أن يحتوي على أرقام فقط";
      isValid = false;
    } else {
      planNumberInput.classList.remove('is-invalid');
      planNumberError.innerText = "";
    }

    // Validation for Plot Number
    if (!plotNumberInput.value) {
        plotNumberInput.classList.add('is-invalid');
        plotNumberError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^\d+$/.test(plotNumberInput.value)) { 
        plotNumberInput.classList.add('is-invalid');
        plotNumberError.innerText = "رقم القطعة يجب أن يحتوي على أرقام فقط";
        isValid = false;
    } else {
        plotNumberInput.classList.remove('is-invalid');
        plotNumberError.innerText = "";
    }

    return isValid;
}
//Validation STEP 4
// Get all input fields
const brandInput = document.getElementById('brand');
const brandError = document.getElementById('brandError');

const storeNameInput = document.getElementById('storeName');
const storeNameError = document.getElementById('storeNameError');

const storeNumberInput = document.getElementById('storeNumber');
const storeNumberError = document.getElementById('storeNumberError');

const floorsInput = document.getElementById('floors');
const floorsError = document.getElementById('floorsError');

const camerasInput = document.getElementById('cameras');
const camerasError = document.getElementById('camerasError');

const elevatorInput = document.getElementById('elevator');
const elevatorError = document.getElementById('elevatorError');

const safetyPermitInput = document.getElementById('safetyPermit');
const safetyPermitError = document.getElementById('safetyPermitError');

const applicantTypeInput = document.getElementById('applicantType');
const applicantTypeError = document.getElementById('applicantTypeError');

const contractTypeInput = document.getElementById('contractType');
const contractTypeError = document.getElementById('contractTypeError');

const boardTypeInput = document.getElementById('boardType');
const boardTypeError = document.getElementById('boardTypeError');

const boardSizeInput = document.getElementById('boardSize');
const boardSizeError = document.getElementById('boardSizeError');

const next4 = document.querySelector('.next-step'); // Change to next4 for Step 4

// Add a click event listener to the "Next" button for Step 4
next4.addEventListener('click', function(event) {
    if (!validateFormStep4()) { // Ensure to call validateForm() for Step 4
        event.preventDefault();
    }
});

// Function to validate the form
function validateFormStep4() {
    let isValid = true;

    // Validation for Brand
    if (brandInput.value === "اختر") {
        brandInput.classList.add('is-invalid');
        brandError.innerText = "يرجى اختيار خيار";
        isValid = false;
    } else {
        brandInput.classList.remove('is-invalid');
        brandError.innerText = "";
    }
    
    // Validation for Store Name
  if (!storeNameInput.value) {
    storeNameInput.classList.add('is-invalid');
    storeNameError.innerText = "هذا الحقل مطلوب";
    isValid = false;
   } else if (!/^[أ-ي]+$/.test(storeNameInput.value)) {
    storeNameInput.classList.add('is-invalid');
    storeNameError.innerText = "يجب ان يحتوي على احرف عربية فقط";
    isValid = false;
   } else {
    storeNameInput.classList.remove('is-invalid');
    storeNameError.innerText = "";
   }
    // Validation for Store Number
    if (!storeNumberInput.value) {
      storeNumberInput.classList.add('is-invalid');
      storeNumberError.innerText = "هذا الحقل مطلوب";
      isValid = false;
    } else if (!/^\d+$/.test(storeNumberInput.value)) { 
      storeNumberInput.classList.add('is-invalid');
      storeNumberError.innerText = "يجب أن يحتوي على أرقام فقط";
      isValid = false;
    } else {
      storeNumberInput.classList.remove('is-invalid');
      storeNumberError.innerText = "";
    }
    // Validation for Floors
    if (!floorsInput.value) {
        floorsInput.classList.add('is-invalid');
        floorsError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^\d+$/.test(floorsInput.value)) { 
        floorsInput.classList.add('is-invalid');
        floorsError.innerText = "يجب أن يحتوي على أرقام فقط";
        isValid = false;
    } else {
        floorsInput.classList.remove('is-invalid');
        floorsError.innerText = "";
    }

    // Validation for Cameras
    if (!camerasInput.value) {
        camerasInput.classList.add('is-invalid');
        camerasError.innerText = "هذا الحقل مطلوب";
        isValid = false;
    } else if (!/^\d+$/.test(camerasInput.value)) { 
        camerasInput.classList.add('is-invalid');
        camerasError.innerText = "يجب أن يحتوي على أرقام فقط";
        isValid = false;
    } else {
        camerasInput.classList.remove('is-invalid');
        camerasError.innerText = "";
    }

    // Validation for Elevator
    if (elevatorInput.value === "اختر") {
        elevatorInput.classList.add('is-invalid');
        elevatorError.innerText = "يرجى اختيار خيار";
        isValid = false;
    } else {
        elevatorInput.classList.remove('is-invalid');
        elevatorError.innerText = "";
    }

    // Validation for Safety Permit
    if (safetyPermitInput.value === "اختر") {
        safetyPermitInput.classList.add('is-invalid');
        safetyPermitError.innerText = "يرجى اختيار خيار";
        isValid = false;
    } else {
        safetyPermitInput.classList.remove('is-invalid');
        safetyPermitError.innerText = "";
    }

    // Validation for Applicant Type
    if (applicantTypeInput.value === "اختر") {
        applicantTypeInput.classList.add('is-invalid');
        applicantTypeError.innerText = "يرجى اختيار خيار";
        isValid = false;
    } else {
        applicantTypeInput.classList.remove('is-invalid');
        applicantTypeError.innerText = "";
    }

    // Validation for Contract Type
    if (contractTypeInput.value === "اختر") {
        contractTypeInput.classList.add('is-invalid');
        contractTypeError.innerText = "يرجى اختيار خيار";
        isValid = false;
    } else {
      contractTypeInput.classList.remove('is-invalid');
      contractTypeError.innerText = "";
   }

  // Validation for Board Type
  if (!boardTypeInput.value) {
      boardTypeInput.classList.add('is-invalid');
      boardTypeError.innerText = "هذا الحقل مطلوب";
      isValid = false;
  } else if (!/^[أ-ي]+$/.test(boardTypeInput.value)) { 
    boardTypeInput.classList.add('is-invalid');
    boardTypeError.innerText = "يجب ان يحتوي على احرف عربية فقط";
    isValid = false;
   } else {
      boardTypeInput.classList.remove('is-invalid');
      boardTypeError.innerText = "";
  }

  // Validation for Board Size
  if (!boardSizeInput.value) {
      boardSizeInput.classList.add('is-invalid');
      boardSizeError.innerText = "هذا الحقل مطلوب";
      isValid = false;
  } else if (!/^\d+$/.test(boardSizeInput.value)) { 
      boardSizeInput.classList.add('is-invalid');
      boardSizeError.innerText = "يجب أن يحتوي على أرقام فقط";
      isValid = false;
  } else {
      boardSizeInput.classList.remove('is-invalid');
      boardSizeError.innerText = "";
  }

  return isValid;
}
