import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import { getRadarData } from "./services/api";
import { SingleRadarData } from "./types";
import MapOptions from "./components/MapOptions";

export default function App() {
  const [radarData, setRadarData] = useState<[] | SingleRadarData[]>([]);
  const [displayedData, setDisplayedData] = useState<SingleRadarData>();
  const [displayedDataIdx, setDisplayedDataIdx] = useState<number>();
  const [maxDataCount, setMaxDataCount] = useState<number>();

  useEffect(() => {
    refreshRadarData();
  }, []);

  const refreshRadarData = async () => {
    try {
      const data = await getRadarData();
      if (data && data.radar && data.radar.past && data.radar.nowcast) {
        let allRadarData = data.radar.past.concat(data.radar.nowcast);
        allRadarData.sort((a, b) => a.time - b.time);

        const now = Math.floor(Date.now() / 1000);
        const closestDataToNow = allRadarData.find(
          (singleData) => singleData.time >= now
        );
        const closestDataIndex = allRadarData.findIndex(
          (data) => data.time === closestDataToNow?.time
        );

        resetDisplay(closestDataIndex, closestDataToNow);
        setMaxDataCount(allRadarData.length);
        setRadarData(allRadarData);
      } else {
        throw new Error(
          'Error. Response received, but has invalid "radar" data.'
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadPreviousData = () => {
    const idx = radarData.findIndex(
      (data) => data.time === displayedData?.time
    );

    const newIdx = idx - 1;

    if (newIdx < 0) {
      return resetDisplay(
        radarData.length - 1,
        radarData[radarData.length - 1]
      );
    }

    resetDisplay(newIdx, radarData[newIdx]);
  };

  const handleLoadNextData = () => {
    const idx = radarData.findIndex(
      (data) => data.time === displayedData?.time
    );

    const newIdx = idx + 1;

    if (newIdx >= radarData.length) return resetDisplay(0, radarData[0]);

    resetDisplay(newIdx, radarData[newIdx]);
  };

  const resetDisplay = (
    idx: number | undefined,
    radarData: SingleRadarData | undefined
  ) => {
    if (idx !== undefined) setDisplayedDataIdx(idx);
    if (radarData !== undefined) setDisplayedData(radarData);
  };

  return (
    <div className="App">
      <MapOptions
        displayedDataIdx={displayedDataIdx}
        maxDataCount={maxDataCount}
        displayedData={displayedData}
        onLoadPreviousData={handleLoadPreviousData}
        onLoadNextData={handleLoadNextData}
        refreshRadarData={refreshRadarData}
      />
      <Map displayedData={displayedData} />
    </div>
  );
}
