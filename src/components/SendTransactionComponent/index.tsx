"use client";

import { FC, useCallback, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Interface } from "ethers";

import { useAuth } from "@/contexts/AuthContext";
import { sendTransaction, getConnections } from "@wagmi/core";
import { Address } from "viem";
import { wagmiConfig } from "@/constants/wagmi-config";
import { useAccount } from "wagmi";
import { polygon } from "viem/chains";

const errorMaps: Record<string, string> = {
  UNPREDICTABLE_GAS_LIMIT: "Insufficient funds",
};

interface SendTransactionComponentProps {
  paymentId: string;
  txHash?: string;
  token: Address;
  ABI: Record<string, any>[];
  amount: number;
  receiptAddress: Address;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
}

const SendTransactionComponent: FC<SendTransactionComponentProps> = ({
  onTxError,
  onTxSent,
  token,
  ABI,
  amount,
  receiptAddress,
  txHash,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { address, isConnected, isConnecting } = useAccount();

  const { isAuth } = useAuth();

  const onSendTxHandler = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      if (!address) {
        throw new Error("Invalid Address");
      }

      const connections = getConnections(wagmiConfig);

      const dataEncoded = new Interface(ABI).encodeFunctionData("transfer", [
        receiptAddress,
        amount,
      ]) as `0x${string}`;

      const hash = await sendTransaction(wagmiConfig, {
        chainId: polygon.id,
        connector: connections[0]?.connector,
        data: dataEncoded,
        to: token,
        value: 0,
      });
      if (!onTxSent) {
        return;
      }
      onTxSent(hash);
    } catch (error) {
      console.error(error);
      setErrorMessage("Send founds failed");
      if (!onTxError) {
        return;
      }
      onTxError(error);
    } finally {
      setLoading(false);
    }
  }, [ABI, amount, onTxError, onTxSent, receiptAddress, token]);

  if (txHash) {
    return (
      <span className="flex-grow text-center text-sm font-medium text-neutral-700 ">
        Transaction hash: {txHash}
      </span>
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
