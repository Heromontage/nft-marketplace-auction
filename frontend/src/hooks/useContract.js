import { useMemo } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../context/Web3Context";

export function useContract(address, abi) {
  const { signer, provider } = useWeb3();

  return useMemo(() => {
    if (!address || !abi) return null;
    const signerOrProvider = signer || provider;
    if (!signerOrProvider) return null;
    return new ethers.Contract(address, abi, signerOrProvider);
  }, [address, abi, signer, provider]);
}