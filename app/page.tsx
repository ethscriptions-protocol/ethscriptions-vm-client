import {
  fetchBlocks,
  fetchTransactions,
  fetchTotalBlocks,
  fetchTotalTransactions,
} from "@/utils/data";
import Home from "./Home";

export default async function Page() {
  const totalBlocks = await fetchTotalBlocks();
  const blocks = await fetchBlocks({ perPage: 10 });
  const { transaction_count, unique_from_address_count } =
    await fetchTotalTransactions();
  const { transactions } = await fetchTransactions({ perPage: 10 });

  return (
    <Home
      totalBlocks={Number(totalBlocks)}
      blocks={blocks}
      totalTransactions={Number(transaction_count)}
      totalWallets={Number(unique_from_address_count)}
      transactions={transactions}
    />
  );
}
