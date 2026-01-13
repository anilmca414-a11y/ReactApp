import React, { useState } from "react";

const MenuItem = ({ item }) => {
  return (
    <li>
      {item.menuName}

      {item.children && item.children.length > 0 && (
        <ul>
          {item.children.map(child => (
            <MenuItem key={child.menuId} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

// const menuData = [
//   {
//     title: "System",
//     children: [
//       { name: "User Setup", path: "/system/users" },
//       { name: "Role Management", path: "/system/roles" }
//     ]
//   },
//   {
//     title: "Masters",
//     children: [
//       { name: "Student Master", path: "/masters/StudentForm" },
//       { name: "Customer Master", path: "/masters/Shipper" },
//       { name: "Vendor Master", path: "/masters/vendors" }
//     ]
//   },
//   {
//     title: "Operation",
//     children: [
//       { name: "Order Entry", path: "/operation/orders" },
//       { name: "Dispatch", path: "/operation/dispatch" }
//     ]
//   },
//   {
//     title: "EDI",
//     children: [
//       { name: "Import EDI", path: "/edi/import" },
//       { name: "Export EDI", path: "/edi/export" }
//     ]
//   },
//   {
//     title: "Account",
//     children: [
//       { name: "Invoices", path: "/account/invoices" },
//       { name: "Payments", path: "/account/payments" }
//     ]
//   },
//   {
//     title: "Reports",
//     children: [
//       { name: "Sales Report", path: "/reports/sales" },
//       { name: "Audit Report", path: "/reports/audit" }
//     ]
//   }
// ];


export default menuData;
