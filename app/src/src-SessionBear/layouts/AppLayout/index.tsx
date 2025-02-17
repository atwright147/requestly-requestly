import React, { useEffect } from "react";
import { submitAppDetailAttributes } from "utils/AnalyticsUtils.js";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import ThirdPartyIntegrationsHandler from "hooks/ThirdPartyIntegrationsHandler";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "utils/feature-flag/growthbook";
import LocalUserAttributesHelperComponent from "hooks/LocalUserAttributesHelperComponent";
import PreLoadRemover from "hooks/PreLoadRemover";
import AppModeInitializer from "hooks/AppModeInitializer";
import ActiveWorkspace from "hooks/ActiveWorkspace";
import AuthHandler from "hooks/AuthHandler";
import ExtensionContextInvalidationNotice from "components/misc/notices/ExtensionContextInvalidationNotice";
import AutomationNotAllowedNotice from "components/misc/notices/AutomationNotAllowedNotice";
import { useIsExtensionEnabled } from "hooks";
import { LazyMotion, domMax } from "framer-motion";
import ThemeProvider from "lib/design-system-v2/helpers/ThemeProvider";
import { useInitializeNewUserSessionRecordingConfig } from "features/settings/components/SessionsBookSettings/hooks";
import DBListeners from "hooks/DbListenerInit/DBListeners";
import { Outlet } from "react-router-dom";

const App = () => {
  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.loadFeatures({ autoRefresh: true });
  }, []);

  useIsExtensionEnabled();
  submitAppDetailAttributes();
  useInitializeNewUserSessionRecordingConfig();

  return (
    <>
      <ExtensionContextInvalidationNotice />
      <AutomationNotAllowedNotice />
      <AuthHandler />
      <PreLoadRemover />
      <AppModeInitializer />
      <DBListeners />
      {/* @ts-ignore */}
      <ActiveWorkspace />
      {/* @ts-ignore */}
      <ThirdPartyIntegrationsHandler />
      <ThemeProvider>
        <ConfigProvider locale={enUS}>
          <GrowthBookProvider growthbook={growthbook}>
            <LocalUserAttributesHelperComponent />
            <LazyMotion features={domMax} strict>
              <div id="requestly-dashboard-layout">
                <Outlet />
              </div>
            </LazyMotion>
          </GrowthBookProvider>
        </ConfigProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
