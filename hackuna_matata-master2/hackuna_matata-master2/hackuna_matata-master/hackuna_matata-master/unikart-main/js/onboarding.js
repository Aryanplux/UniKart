// Onboarding Manager
class OnboardingManager {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 3;
        this.username = 'User';
        this.profileData = {
            profilePic: null,
            bio: '',
            course: '',
            specialization: '',
            skills: [],
            interests: []
        };
        
        this.init();
    }

    init() {
        this.loadUsername();
        this.bindEvents();
        this.showStep(0);
        this.initializeAnimations();
    }

    loadUsername() {
        // Get username from localStorage or URL params
        const savedUser = Utils.storage.get('currentUser');
        if (savedUser && savedUser.username) {
            this.username = savedUser.username;
        }
        
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (usernameDisplay) {
            usernameDisplay.textContent = this.username;
        }
    }

    bindEvents() {
        // Step 0: Get Started button
        const getStartedBtn = document.getElementById('getStartedBtn');
        getStartedBtn?.addEventListener('click', () => this.nextStep());

        // Step 1: Profile setup
        const profileContinueBtn = document.getElementById('profileContinueBtn');
        const profileSkipBtn = document.getElementById('profileSkipBtn');
        const profilePicInput = document.getElementById('pfp-upload');

        profileContinueBtn?.addEventListener('click', () => this.nextStep());
        profileSkipBtn?.addEventListener('click', () => this.nextStep());
        profilePicInput?.addEventListener('change', (e) => this.handleImageChange(e));

        // Step 2: Course and interests
        const finishBtn = document.getElementById('finishBtn');
        const backBtn = document.getElementById('backBtn');
        const courseSelect = document.getElementById('courseSelect');

        finishBtn?.addEventListener('click', () => this.finish());
        backBtn?.addEventListener('click', () => this.prevStep());
        courseSelect?.addEventListener('change', (e) => this.handleCourseChange(e));

        // Chips selection
        this.bindChipEvents();
    }

    bindChipEvents() {
        const skillChips = document.querySelectorAll('#skillsContainer .chip');
        const interestChips = document.querySelectorAll('#interestsContainer .chip');

        skillChips.forEach(chip => {
            chip.addEventListener('click', () => this.toggleChip(chip, 'skills'));
        });

        interestChips.forEach(chip => {
            chip.addEventListener('click', () => this.toggleChip(chip, 'interests'));
        });
    }

    toggleChip(chip, type) {
        const value = chip.dataset.value;
        const isSelected = chip.classList.contains('selected');

        if (isSelected) {
            chip.classList.remove('selected');
            this.profileData[type] = this.profileData[type].filter(item => item !== value);
        } else {
            chip.classList.add('selected');
            this.profileData[type].push(value);
        }

        // Add hover animation
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chip.style.transform = '';
        }, 150);
    }

    handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profileData.profilePic = e.target.result;
                this.updateProfilePicPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    updateProfilePicPreview(imageSrc) {
        const placeholder = document.getElementById('profilePicPlaceholder');
        const preview = document.getElementById('profilePicPreview');

        placeholder.style.display = 'none';
        preview.src = imageSrc;
        preview.style.display = 'block';

        // Add scale animation
        preview.style.transform = 'scale(0.8)';
        preview.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            preview.style.transform = 'scale(1)';
        }, 50);
    }

    handleCourseChange(e) {
        this.profileData.course = e.target.value;
        this.updateFinishButton();
    }

    updateFinishButton() {
        const finishBtn = document.getElementById('finishBtn');
        if (this.profileData.course) {
            finishBtn.disabled = false;
            finishBtn.style.backgroundColor = '#e31c1c';
            finishBtn.style.color = 'white';
            finishBtn.style.cursor = 'pointer';
        } else {
            finishBtn.disabled = true;
            finishBtn.style.backgroundColor = '#ddd';
            finishBtn.style.color = '#aaa';
            finishBtn.style.cursor = 'not-allowed';
        }
    }

    nextStep() {
        if (this.currentStep < this.maxSteps - 1) {
            this.collectCurrentStepData();
            this.showStep(this.currentStep + 1);
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }

    showStep(stepIndex) {
        // Hide current step
        const currentStepEl = document.getElementById(`step-${this.currentStep}`);
        if (currentStepEl) {
            currentStepEl.classList.add('exit-left');
            setTimeout(() => {
                currentStepEl.style.display = 'none';
                currentStepEl.classList.remove('exit-left');
            }, 400);
        }

        // Show new step
        setTimeout(() => {
            this.currentStep = stepIndex;
            const newStepEl = document.getElementById(`step-${stepIndex}`);
            if (newStepEl) {
                newStepEl.style.display = 'block';
                setTimeout(() => {
                    newStepEl.classList.add('active');
                }, 50);
            }

            // Special handling for step 2
            if (stepIndex === 2) {
                this.updateFinishButton();
            }
        }, 200);
    }

    collectCurrentStepData() {
        if (this.currentStep === 1) {
            // Collect bio data
            const bioInput = document.getElementById('bioInput');
            this.profileData.bio = bioInput.value;
        } else if (this.currentStep === 2) {
            // Collect course and specialization
            const courseSelect = document.getElementById('courseSelect');
            const specializationInput = document.getElementById('specializationInput');
            
            this.profileData.course = courseSelect.value;
            this.profileData.specialization = specializationInput.value;
        }
    }

    finish() {
        if (!this.profileData.course) {
            Utils.showError('Please select your course to continue');
            return;
        }

        this.collectCurrentStepData();
        
        // Show loading state
        const finishBtn = document.getElementById('finishBtn');
        Utils.showButtonLoading(finishBtn, 'Finishing...');

        // Simulate onboarding completion
        setTimeout(() => {
            this.completeOnboarding();
        }, 1500);
    }

    completeOnboarding() {
        console.log('🎉 Onboarding Complete!', this.profileData);

        // Save profile data
        Utils.storage.set('userProfile', this.profileData);
        Utils.storage.set('onboardingCompleted', true);

        // Show success message
        Utils.showSuccess('Welcome to UniKart! Your profile has been set up successfully.');

        // Navigate to home page
        setTimeout(() => {
            window.location.href = '../pages/home.html';
        }, 2000);
    }

    initializeAnimations() {
        // Add entrance animation to the card
        const card = document.getElementById('onboardingCard');
        setTimeout(() => {
            const step0 = document.getElementById('step-0');
            step0.classList.add('active');
        }, 500);
    }
}

// Initialize onboarding when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.onboardingManager = new OnboardingManager();
});

// Add CSS animations via JavaScript for chips
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .chip {
            transform: translateY(0);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .chip:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .chip:active {
            transform: translateY(0) scale(0.95);
            transition: all 0.1s ease;
        }
        
        .chip.selected {
            animation: chipSelect 0.3s ease;
        }
        
        @keyframes chipSelect {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
});
