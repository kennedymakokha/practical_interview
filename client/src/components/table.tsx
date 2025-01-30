import React from 'react';
import { Paginator } from './Paginator';
import Input from './Input';
import instance from '@/utils/instance';



interface TableProps {
  noAction?: Boolean;
  paginate?: Number,
  addFunction?: any
  page?: Number
  role?: String
  closeDetailModal?: any
  openDetailModal?: any
  state?: String
  filter?: any
  action?: any
  setFilter?: any
  otherAction?: String;
  isLoading?: Boolean,
  key_column?: String;
  title?: String;
  data?: Array<any>;
  columns?: { Header?: String | any, accessor?: String | any }[]

  Repeat?: any; // Function to handle button click

  disabled?: boolean; // Optional prop to disable the button
}

const Table: React.FC<TableProps> = ({ noAction, action, state, role, otherAction, openDetailModal, closeDetailModal, addFunction, filter, setFilter, paginate, page, isLoading, Repeat, columns, data, disabled = false }) => {


  return (
    <div className='w-full'>
      <div className="flex w-full border-t border-slate-100 py-1 h-10">
        <div className="flex h-full w-1/3 rounded-md px-2">
          <div className={`flex items-center justify-center  uppercase  h-full w-1/2 rounded-md ${state === "completed" ? "bg-green-500" : state === "scheduled" ? "bg-slate-500 text-slate-100" : state === "launched" ? "bg-[#81b1ff]" : ""} `}>
            {state}
          </div>
        </div>
        <div className="flex h-full w-2/3 ">
          <div className={`flex h-full  ${addFunction ? "w-2/3" : "w-full"}  `}>
            <Input label="" placeholder={`Search in the ${state} campaigns`} name="" onChange={(e: any) => setFilter((prev: any) => ({ ...prev, word: e }))} disable={false} min={100} required={false} type="text" />

          </div>
          <div onClick={addFunction} className={` ${addFunction ? "flex" : "hidden"} h-full w-1/3 items-center justify-center`}>
            <div className={`flex cursor-pointer hover:bg-blue-400 rounded-md h-full w-1/2 border font-semibold   items-center justify-center bg-blue-300`}>
              New Campaign </div>
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns?.map((column: any) => (
              <th
                key={column.accessor}
                className="py-2 px-4 border-b uppercase text-[12px]   border-gray-200 text-left text-gray-600"
              >
                {column.Header}
              </th>
            ))}

          </tr>
        </thead>

        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50 ">
              {columns?.map((column) => (
                <td
                  key={column.accessor}
                  className="py-2 text-start  text-[18px] capitalize px-4 border-b border-gray-200 text-gray-500"
                >
                  <div onClick={() => { column.accessor === "name" && openDetailModal(row) }} className={`flex  gap-x-2 ${column.accessor === "name" && "cursor-pointer hover:text-blue-400"}`}>{column.accessor === "links" ? row[column.accessor].map((o: any | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: any) => (
                    <div key={i} onClick={() => { openDetailModal(column) }} className={` px-2 flex items-center justify-center text-sm text-white  rounded-md ${o?.media === "facebook" && o?.link !== "" ? "bg-[#0866ff]" : o?.media === "tiktok" && o?.link !== "" ? "bg-[#FE2C55] text-black" : o?.media === "youtube" && o?.link !== "" ? "bg-[#f900ea] " : o?.media === "instagram" && o?.link !== "" ? "bg-[#3082b7] " : o?.media === "x" && o?.link !== "" ? "bg-[#0231e8]" : " bg-slate-300"} `}>{o?.media}</div>
                  )) : column.accessor === "approved" && row[column.accessor] === null ? "pending" : row[column.accessor]}</div>
                </td>
              ))}

              {!noAction && role === "campaigner" && <td className="py-2 text-start  px-4 border-b border-l border-gray-200  text-gray-800">
                <div className="flex gap-2 ">
                  <div onClick={() => action("disapproved", row._id)} className=' size-8 border-red-500  p-2 border  flex items-center justify-center rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>


                  </div>
                  <div onClick={() => action("approved", row._id)} className=' size-8 border-blue-400  p-2 border   flex items-center justify-center rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>

              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div >

  );
};

export default Table;
