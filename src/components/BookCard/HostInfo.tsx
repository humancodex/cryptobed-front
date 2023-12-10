import { FC } from "react";
import WalletAddressComponent from "../WalletAddressComponent";

interface HostInfoProps {
  name: string;
  email?: string;
  address: string;
}

const HostInfo: FC<HostInfoProps> = ({ name, email = "--", address }) => {
  return (
    <>
      <div className="block my-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          {name}
        </span>
      </div>
      <div className="block mb-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Host: <WalletAddressComponent address={address} />
        </span>
      </div>
      <div className="block mb-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Host Email: {email ?? "--"}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-2"></div>
    </>
  );
};

export default HostInfo;
