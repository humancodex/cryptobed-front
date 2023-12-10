import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../../../../components/ReservationComponent/GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { GuestsObject } from "../../../../interfaces/guest.interface";

const StaySearchForm: FC<{
  hasButtonSubmit?: boolean;
  onChangeHandler?: (location: string, guest: number) => void;
}> = ({ hasButtonSubmit = true, onChangeHandler }) => {
  const [location, setLocation] = useState("");
  const [guest, setGuests] = useState(0);

  useEffect(() => {
    onChangeHandler && onChangeHandler(location, guest);
  }, [location, guest, onChangeHandler]);

  const handleChangeGuests = (guests: GuestsObject) => {
    setGuests(guests.guestAdults + guests.guestChildren + guests.guestInfants);
  };

  const renderForm = () => {
    return (
      <form className="w-full sm:h-full relative mt-8 flex md:rounded-full md:shadow-xl md:dark:shadow-2xl bg-white dark:bg-neutral-800 sm:flex-col">
        <LocationInput className="" onChange={(item) => setLocation(item)} />
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput className="flex-1" /> */}
        <div className="self-center sm:hidden border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="md:flex-1"
          onChange={handleChangeGuests}
          hasButtonSubmit={hasButtonSubmit}
          buttonSubmitHref={`/?location=${location}&guest=${guest}`}
        />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
