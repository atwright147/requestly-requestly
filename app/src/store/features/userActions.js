export const updateUserInfo = (prevState, action) => {
  prevState.user.loggedIn = action.payload.loggedIn;
  if (action.payload.details) {
    prevState.user.details = {
      ...(prevState.user.details || {}),
      ...action.payload.details,
    };
  } else {
    prevState.user.details = null;
  }
};

export const updateUserProfile = (prevState, action) => {
  prevState.user.details.profile = action.payload.userProfile;

  prevState.user.details.isSyncEnabled = action.payload.userProfile?.isSyncEnabled || false;

  prevState.user.details.isBackupEnabled = action.payload.userProfile?.isBackupEnabled || false;
};

export const updateUserPlanDetails = (prevState, action) => {
  prevState.user.details.planDetails = action.payload.userPlanDetails;
  prevState.user.details.isPremium = action.payload.isUserPremium;
};

export const updateUserPreferences = (prevState, action) => {
  prevState.userPreferences[action.payload.key] = action.payload.value;
};

export const updateSecondarySidebarCollapse = (prevState, action) => {
  const isCollapsed = prevState.userPreferences.isSecondarySidebarCollapsed;
  prevState.userPreferences.isSecondarySidebarCollapsed = action.payload ?? !isCollapsed;
};

export const updateUsername = (prevState, action) => {
  prevState.user.details.username = action.payload.username;
};

export const updateUserDisplayName = (prevState, action) => {
  prevState.user.details.profile.displayName = action.payload;
};

export const updateUserLimitReached = (prevState, action) => {
  prevState.user.isLimitReached = action.payload;
};

export const updateOrganizationDetails = (prevState, action) => {
  prevState.user.details.organization = action.payload;
};

//Persona Survey actions
export const setUserPersonaData = (prevState, action) => {
  prevState.userPersona = { ...prevState.userPersona, ...action.payload };
};

export const updateUserPersona = (prevState, action) => {
  prevState.userPersona[action.payload.key] = action.payload.value;
};

export const updateSelectedPersonaUseCase = (prevState, action) => {
  const { useCases } = prevState.userPersona;
  const { payload } = action;

  const index = useCases.findIndex((option) => JSON.stringify(option) === JSON.stringify(payload));

  if (index === -1) {
    prevState.userPersona.useCases = [...useCases, payload];
  } else {
    prevState.userPersona.useCases = [...useCases.slice(0, index), ...useCases.slice(index + 1)];
  }
};

export const updateOtherPersonaUseCase = (prevState, action) => {
  const { useCases } = prevState.userPersona;
  const { payload } = action;

  const index = useCases.findIndex((option) => option.optionType === "other");

  if (index === -1) {
    if (payload.value.length) {
      prevState.userPersona.useCases.push(payload);
    }
  } else {
    if (payload.value.length) {
      prevState.userPersona.useCases[index].value = payload.value;
    } else {
      prevState.userPersona.useCases.splice(index, 1);
    }
  }
};

export const updateIsPersonaSurveyCompleted = (prevState, action) => {
  prevState.userPersona.isSurveyCompleted = action.payload;
};
export const updatePersonaSurveyPage = (prevState, action) => {
  prevState.userPersona.page = action.payload;
};

export const updateUserAttributes = (prevState, action) => {
  prevState.userAttributes = {
    ...prevState.userAttributes,
    ...action.payload,
  };
};

export const updateProductTourCompleted = (prevState, action) => {
  if (action.payload.subTour) prevState.misc.persist[action.payload.tour][action.payload.subTour] = true;
  else prevState.misc.persist[action.payload.tour] = true;
};

export const updateNetworkSessionSaveInProgress = (prevState, action) => {
  prevState.misc.nonPersist.networkSessionSaveInProgress = action.payload;
};

export const updateNetworkSessionTooltipShown = (prevState) => {
  prevState.misc.persist.isNetworkSessionTooltipShown = true;
};

export const updateIsWorkspaceOnboardingCompleted = (prevState) => {
  prevState.workspaceOnboarding.isOnboardingCompleted = true;
  prevState.workspaceOnboarding.workspace = {};
};

export const updateWorkspaceOnboardingStep = (prevState, action) => {
  prevState.workspaceOnboarding.step = action.payload;
};

export const updateAppOnboardingCompleted = (prevState) => {
  prevState.appOnboarding.isOnboardingCompleted = true;
};

export const updateAppOnboardingStep = (prevState, action) => {
  prevState.appOnboarding.step = action.payload;
  prevState.appOnboarding.disableSkip = false;
};

export const updateIsAppOnboardingStepDisabled = (prevState, action) => {
  prevState.appOnboarding.disableSkip = action.payload;
};

export const updateAppOnboardingPersona = (prevState, action) => {
  prevState.appOnboarding.persona = action.payload;
};

export const updateAppOnboardingFullName = (prevState, action) => {
  prevState.appOnboarding.fullName = action.payload;
};

export const updateAppOnboardingTeamDetails = (prevState, action) => {
  prevState.appOnboarding.createdWorkspace = {
    ...prevState.appOnboarding.createdWorkspace,
    ...action.payload,
  };
};

export const updateWorkspaceOnboardingTeamDetails = (prevState, action) => {
  prevState.workspaceOnboarding.workspace = { ...prevState.workspaceOnboarding.workspace, ...action.payload };
};

export const updateIsCommandBarOpen = (prevState, action) => {
  prevState.misc.nonPersist.isCommandBarOpen = action.payload;
};

export const updateLastSeenInviteTs = (prevState, action) => {
  prevState.misc.persist.lastSeenInviteTs = action.payload;
};

export const updateJoinWorkspaceCardVisible = (prevState, action) => {
  prevState.misc.persist.isJoinWorkspaceCardVisible = action.payload;
};

export const updateIsProductHuntLaunchedBannerClosed = (prevState, action) => {
  prevState.misc.persist.isProductHuntLaunchedBannerClosed = action.payload;
};

export const updateExtensionInstallSource = (prevState, action) => {
  prevState.misc.persist.extensionInstallSource = action.payload;
};

export const updateTimeToResendEmailLogin = (prevState, action) => {
  prevState.misc.nonPersist.timeToResendEmailLogin = action.payload;
};

export const updateAppNotificationBannerDismissTs = (prevState, action) => {
  prevState.misc.persist.appNotificationBannerDismissTs = action.payload;
};

export const updateIsOrgBannerDismissed = (prevState, action) => {
  prevState.misc.persist.isOrgBannerDismissed = action.payload;
};

export const updatePlanExpiredBannerClosed = (prevState, action) => {
  prevState.misc.persist.isPlanExpiredBannerClosed = action.payload;
};

export const updateIsManageBillingTeamAlertVisible = (prevState, action) => {
  prevState.misc.persist.isManageBillingTeamAlertVisible = action.payload;
};

export const updateIsAppBannerVisible = (prevState, action) => {
  prevState.misc.nonPersist.isAppBannerVisible = action.payload;
};

export const updateIsSupportChatOpened = (prevState, action) => {
  prevState.misc.persist.isSupportChatOpened = action.payload;
};
