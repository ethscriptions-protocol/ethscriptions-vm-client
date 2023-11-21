import { Block, Transaction, InternalTransaction } from "@/types/blocks";
import { Card } from "@/types/cards";
import { Contract, ContractArtifact } from "@/types/contracts";
import { Ethscription } from "@/types/ethscriptions";

export const fetchTotalBlocks = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks/total`);
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: 0,
    }));
  return result as number;
};

export const fetchBlocks = async ({ page = 1, perPage = 20 } = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks`);
  url.search = new URLSearchParams({
    page: `${page}`,
    per_page: `${perPage}`,
  }).toString();
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: [],
    }));
  return result as Block[];
};

export const fetchBlock = async (blockNumber: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/blocks/${blockNumber}`
  );
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: null,
    }));
  return result as Block;
};

export const fetchTotalTransactions = async () => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions/total`
  );
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: null,
    }));
  return result as {
    transaction_count: number;
    unique_from_address_count: number;
  };
};

export const fetchTransactions = async ({
  page = 1,
  perPage = 20,
  block,
  to,
  from,
  toOrFrom,
}: {
  page?: string | number;
  perPage?: string | number;
  block?: string | number;
  to?: string;
  from?: string;
  toOrFrom?: string;
} = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions`);
  const params: { [key: string]: string } = {
    page: `${page}`,
    per_page: `${perPage}`,
  };
  if (block) {
    params.block_number = `${block}`;
  }
  if (to) {
    params.to = to;
  }
  if (from) {
    params.from = from;
  }
  if (toOrFrom) {
    params.to_or_from = toOrFrom;
  }
  url.search = new URLSearchParams(params).toString();
  const { result, count } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: [],
      count: 0,
    }));
  return { transactions: result, count } as {
    transactions: Transaction[];
    count: number;
  };
};

export const fetchTransaction = async (txHash: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/transactions/${txHash}`
  );
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: null,
    }));
  return result as Transaction;
};

export const fetchInternalTransactions = async ({
  page = 1,
  perPage = 20,
  txHash,
  to,
  from,
  toOrFrom,
}: {
  page?: string | number;
  perPage?: string | number;
  txHash?: string;
  to?: string;
  from?: string;
  toOrFrom?: string;
} = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/contract_calls`);
  const params: { [key: string]: string } = {
    page: `${page}`,
    per_page: `${perPage}`,
  };
  if (txHash) {
    params.transaction_hash = `${txHash}`;
  }
  if (to) {
    params.to = to;
  }
  if (from) {
    params.from = from;
  }
  if (toOrFrom) {
    params.to_or_from = toOrFrom;
  }
  url.search = new URLSearchParams(params).toString();
  const { result, count } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: [],
      count: 0,
    }));
  return { transactions: result, count } as {
    transactions: InternalTransaction[];
    count: number;
  };
};

export const fetchContractArtifacts = async () => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/contracts/supported-contract-artifacts`
  );
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: [],
    }));
  return result as ContractArtifact[];
};

export const fetchContracts = async ({
  page = 1,
  perPage = 20,
  hash,
}: {
  page?: string | number;
  perPage?: string | number;
  hash?: string | number;
} = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URI}/contracts`);
  const params: { [key: string]: string } = {
    page: `${page}`,
    per_page: `${perPage}`,
  };
  if (hash) {
    params.init_code_hash = `${hash}`;
  }
  url.search = new URLSearchParams(params).toString();
  const { result, count } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: [],
      count: 0,
    }));
  return { contracts: result, count } as {
    contracts: Contract[];
    count: number;
  };
};

export const fetchContract = async (address: string) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/contracts/${address}`
  );
  const { result } = await fetch(url.href, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => ({
      result: null,
    }));
  return result as Contract;
};

export const fetchCard = async (name: string) => {
  const url = new URL(
    "https://mainnet-api.ethscriptions.com/api/ethscriptions/filtered"
  );
  url.search = new URLSearchParams({
    creator: "0x038b9e0eef0f926682d3a9b1918611efec9cc741", // pre-registration smart contract
    media_type: JSON.stringify(name),
  }).toString();
  const res = await fetch(url.href).then((res) => res.json());
  const { ethscriptions }: { ethscriptions: Ethscription[] } = res;
  const ethscription = ethscriptions[0];
  if (!ethscription) throw "Card not found";
  const card = JSON.parse(ethscription.content_uri.split(";rule=esip6,")[1]);
  return card as Card;
};
