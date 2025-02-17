import { NetworkEventData, RQSessionEventType } from "@requestly/web-sdk";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getSessionRecordingAttributes, getSessionRecordingEvents } from "store/features/session-recording/selectors";
import { NetworkLog } from "features/sessionBook/types";
import { convertSessionRecordingNetworkLogsToRQNetworkLogs } from "views/features/sessions/SessionViewer/NetworkLogs/helpers";
import NetworkLogsPanel from "views/features/sessions/SessionViewer/NetworkLogs/NetworkLogsPanel";
import { BottomSheetPlacement, useBottomSheetContext } from "componentsV2/BottomSheet";
import { useLocation } from "react-router-dom";
import "./sessionNetworkLogs.scss";

interface SessionNetworkLogsProps {
  playerTimeOffset: number;
}

const SessionNetworkLogs: React.FC<SessionNetworkLogsProps> = ({ playerTimeOffset }) => {
  const location = useLocation();
  const events = useSelector(getSessionRecordingEvents);
  const attributes = useSelector(getSessionRecordingAttributes);
  const { sheetPlacement } = useBottomSheetContext();
  const isDraftSession = location.pathname.includes("draft");

  const networkLogs = useMemo<NetworkLog[]>(() => {
    const networkEvents = events?.[RQSessionEventType.NETWORK] || [];
    return networkEvents.map((networkEvent: NetworkEventData) => ({
      ...networkEvent,
      timeOffset: Math.floor((networkEvent.timestamp - attributes?.startTime) / 1000),
    }));
  }, [events, attributes?.startTime]);

  const rqNetworkLogs = useMemo(() => convertSessionRecordingNetworkLogsToRQNetworkLogs(networkLogs), [networkLogs]);

  if (rqNetworkLogs) {
    return (
      <div
        className={`session-network-logs-container ${
          sheetPlacement === BottomSheetPlacement.BOTTOM
            ? "network-logs-container-bottom"
            : "network-logs-container-right"
        }`}
      >
        <NetworkLogsPanel
          startTime={attributes?.startTime}
          networkLogs={rqNetworkLogs}
          playerTimeOffset={playerTimeOffset}
          disableFilters={isDraftSession}
        />
      </div>
    );
  } else {
    // TODO: ADD EMPTY STATE
    return <>No Logs</>;
  }
};

export default React.memo(SessionNetworkLogs);
