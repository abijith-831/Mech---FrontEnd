import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";

const MyTable = () => {
  const invoices = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { id: "INV003", status: "Failed", method: "Bank Transfer", amount: "$320.00" },
    { id: "INV004", status: "Paid", method: "Crypto", amount: "$500.00" },
    { id: "INV005", status: "Pending", method: "Crypto", amount: "$500.00" },
    { id: "INV006", status: "Paid", method: "Crypto", amount: "$500.00" },
    { id: "INV007", status: "Failed", method: "Crypto", amount: "$500.00" },

  ];

  return (
    <div className=" bg-white shadow-lg rounded-lg mt-10">
      <Table>
      <TableCaption className="text-lg font-semibold">Table Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-gray-100 transition">
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTable;
