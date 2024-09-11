import { SingleRadarData } from "../types";
import TimeChanger from "./TimeChanger";
import "./MapOptions.css";

interface MapOptionsProps {
  onLoadPreviousData: () => void;
  onLoadNextData: () => void;
  displayedData: undefined | SingleRadarData;
  displayedDataIdx: undefined | number;
  maxDataCount: undefined | number;
  refreshRadarData: () => void;
}

function MapOptions({
  onLoadPreviousData,
  onLoadNextData,
  displayedData,
  displayedDataIdx,
  maxDataCount,
  refreshRadarData,
}: MapOptionsProps) {
  const convertSecondsToDate = (seconds: number) => {
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const now = Date.now() / 1000;
  return (
    <div className="map-options">
      {displayedData === undefined ? (
        <></>
      ) : (
        <h3 id="time-header">
          {convertSecondsToDate(displayedData.time)}{" "}
          {now > displayedData.time ? "(PAST)" : "(FORECAST)"}
        </h3>
      )}
      <TimeChanger
        displayedDataIdx={displayedDataIdx}
        maxDataCount={maxDataCount}
        onLoadPreviousData={onLoadPreviousData}
        onLoadNextData={onLoadNextData}
        refreshRadarData={refreshRadarData}
      />
    </div>
  );
}

export default MapOptions;
