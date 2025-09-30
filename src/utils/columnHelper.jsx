import { createColumnHelper } from "@tanstack/react-table";
import FlagIcon from '@mui/icons-material/Flag';

const columnHelper = createColumnHelper();

export const taskColumns = [
  columnHelper.accessor("taskname", {
    header: "Task",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("completed", {
    header: "Completed",
    cell: ({ row, getValue }) => {
      const isChecked = getValue();

      return (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            const updatedData = [...data];
            updatedData[row.index].completed = e.target.checked;
            setData(updatedData);
          }}
        />
      );
    },
  }),
  columnHelper.accessor("important", {
    header: "Important",
    cell: ({ row, getValue }) => {
      const isChecked = getValue();

      return (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            const updatedData = [...data];
            updatedData[row.index].completed = e.target.checked;
            setData(updatedData);
          }}
        />
      );
    },
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: ({ row, getValue }) => {
      const priority = getValue();
      return (
        <span>
         {priority == 'high' && <FlagIcon sx={{ color: 'red', width: "20px", height: "20px" }} />}
         {priority == 'low' && <FlagIcon sx={{ color: 'green', width: "20px", height: "20px" }} />}
         {priority == 'medium' && <FlagIcon sx={{ color: 'orange', width: "20px", height: "20px" }} />}
        </span>
      )
    },
  }),
];

export const usersColumns = [
  columnHelper.accessor('username', {
    header: 'Username',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
];
