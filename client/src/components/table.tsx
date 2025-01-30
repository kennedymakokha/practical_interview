/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Input from './Input';

interface TableProps {
  noAction?: boolean;
  paginate?: number;
  addFunction?: any;
  page?: number;
  role?: string;
  closeDetailModal?: any;
  openDetailModal?: any;
  state?: string;
  filter?: any;
  action?: any;
  setFilter?: any;
  otherAction?: string;
  isLoading?: boolean;
  key_column?: string;
  title?: string;
  data?: Array<any>;
  columns?: { Header?: string | any; accessor?: string | any }[];

  Repeat?: any; // Function to handle button click

  disabled?: boolean; // Optional prop to disable the button
}

const Table: React.FC<TableProps> = ({
  noAction,
  action,
  state,
  role,
  openDetailModal,
  addFunction,
  setFilter,
  columns,
  data,
}) => {
  return (
    <div className="w-full">
      <div className="flex h-10 w-full border-t border-slate-100 py-1">
        <div className="flex h-full w-1/3 rounded-md px-2">
          <div
            className={`flex h-full  w-full md:w-1/2 items-center text-[10px] md:text-[14px] justify-center rounded-md uppercase ${state === 'completed' ? 'bg-green-500' : state === 'scheduled' ? 'bg-slate-500 text-slate-100' : state === 'launched' ? 'bg-[#81b1ff]' : ''} `}
          >
            {state}
          </div>
        </div>
        <div className="flex h-full w-2/3">
          <div className={`flex h-full ${addFunction ? 'w-2/3' : 'w-full'} `}>
            <Input
              label=""
              placeholder={`Search in the ${state} campaigns`}
              name=""
              onChange={(e: any) => setFilter((prev: any) => ({ ...prev, word: e }))}
              disable={false}
              min={100}
              required={false}
              type="text"
            />
          </div>
          <div
            onClick={addFunction}
            className={` ${addFunction ? 'flex' : 'hidden'} h-full w-1/3 items-center justify-center`}
          >
            <div
              className={`flex h-full w-1/2 cursor-pointer items-center justify-center rounded-md border bg-blue-300 font-semibold hover:bg-blue-400`}
            >
              New Campaign{' '}
            </div>
          </div>
        </div>
      </div>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-200">
          <tr>
            {columns?.map((column: any) => (
              <th
                key={column.accessor}
                className="border-b border-gray-200 px-4 py-2 text-left text-[12px] uppercase text-gray-600"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns?.map((column) => (
                <td
                  key={column.accessor}
                  className="border-b border-gray-200 px-4 py-2 text-start text-[18px] capitalize text-gray-500"
                >
                  <div
                    onClick={() => {
                      column.accessor === 'name' && openDetailModal(row);
                    }}
                    className={`flex gap-x-2 ${column.accessor === 'name' && 'cursor-pointer hover:text-blue-400'}`}
                  >
                    {column.accessor === 'links'
                      ? row[column.accessor].map(
                          (
                            o:
                              | any
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            i: any,
                          ) => (
                            <div
                              key={i}
                              onClick={() => {
                                openDetailModal(column);
                              }}
                              className={`flex items-center justify-center rounded-md px-2 text-sm text-white ${o?.media === 'facebook' && o?.link !== '' ? 'bg-[#0866ff]' : o?.media === 'tiktok' && o?.link !== '' ? 'bg-[#FE2C55] text-black' : o?.media === 'youtube' && o?.link !== '' ? 'bg-[#f900ea]' : o?.media === 'instagram' && o?.link !== '' ? 'bg-[#3082b7]' : o?.media === 'x' && o?.link !== '' ? 'bg-[#0231e8]' : 'bg-slate-300'} `}
                            >
                              {o?.media}
                            </div>
                          ),
                        )
                      : column.accessor === 'approved' && row[column.accessor] === null
                        ? 'pending'
                        : row[column.accessor]}
                  </div>
                </td>
              ))}

              {!noAction && role === 'campaigner' && (
                <td className="border-b border-l border-gray-200 px-4 py-2 text-start text-gray-800">
                  <div className="flex gap-2">
                    <div
                      onClick={() => action('disapproved', row._id)}
                      className="flex size-8 items-center justify-center rounded-md border border-red-500 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => action('approved', row._id)}
                      className="flex size-8 items-center justify-center rounded-md border border-blue-400 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-blue-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
