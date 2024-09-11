import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdRefresh,
} from "react-icons/md";

interface TimeChangerProps {
  onLoadPreviousData: () => void;
  onLoadNextData: () => void;
  displayedDataIdx: undefined | number;
  maxDataCount: undefined | number;
  refreshRadarData: () => void;
}

function TimeChanger({
  onLoadPreviousData,
  onLoadNextData,
  displayedDataIdx,
  maxDataCount,
  refreshRadarData,
}: TimeChangerProps) {
  return (
    <div className="time-changer">
      {displayedDataIdx === undefined || maxDataCount === undefined ? (
        <></>
      ) : (
        <>
          <button onClick={onLoadPreviousData}>
            {<MdKeyboardArrowLeft />}
          </button>
          <button onClick={refreshRadarData}>{<MdRefresh />}</button>
          <button onClick={onLoadNextData}>{<MdKeyboardArrowRight />}</button>
        </>
      )}
    </div>
  );
}

export default TimeChanger;
