"use client";

import { FC, useCallback, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSendTransaction } from "wagmi";
import { Interface } from "ethers";
import { useAuth } from "@/contexts/AuthContext";

const errorMaps: Record<string, string> = {
  UNPREDICTABLE_GAS_LIMIT: "Insufficient funds",
};

interface SendTransactionComponentProps {
  paymentId: string;
  txHash?: string;
  token: string;
  ABI: Record<string, any>[];
  amount: number;
  receiptAddress: string;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
}

const SendTransactionComponent: FC<SendTransactionComponentProps> = ({
  onTxError,
  onTxSent,
  token,
  ABI,
  amount,
  paymentId,
  receiptAddress,
  txHash,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuth } = useAuth();
  const { sendTransactionAsync } = useSendTransaction();

  const onSendTxHandler = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const dataEncoded = new Interface(ABI).encodeFunctionData("transfer", [
        receiptAddress,
        amount,
      ]) as `0x${string}`;

      const tx = {
        to: token,
        data: dataEncoded,
        chainId: 1,
      };

      const { hash } = await sendTransactionAsync(tx);

      if (!onTxSent) {
        return;
      }
      onTxSent(hash);
    } catch (error) {
      setErrorMessage("Send founds failed");
      if (!onTxError) {
        return;
      }
      onTxError(error);
    } finally {
      setLoading(false);
    }
  }, [ABI, amount, onTxError, onTxSent, paymentId, receiptAddress, token]);

  if (txHash) {
    return (
      <>
        <span className="flex-grow text-center text-sm font-medium text-neutral-700 ">
          Transaction hash: {txHash}
        </span>
      </>
    );
  }

  return (
    <>
      <ButtonPrimary
        className="sm:w-full"
        loading={loading}
        disabled={!isAuth}
        onClick={onSendTxHandler}
      >
        Send Crypto
      </ButtonPrimary>

      <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
        {errorMessage}
      </h3>
    </>
  );
};

export default SendTransactionComponent;
