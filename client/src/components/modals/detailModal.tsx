/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Input, { TextArea } from '../Input';
import SocialButton from '../sociamediaItem';
import { SocialMediaArray } from '../../../data';
import instance from '@/utils/instance';
import toast from 'react-hot-toast';
import Table from '../table';

interface CreateModalProps {
  cancel?: any;
  error?: any;
  submit?: any;
  item?: any;
  title?: string;
  body: any;
  role?: any;
  fetchData: any;
}

const DetailModal: React.FC<CreateModalProps> = ({
  cancel,
  fetchData,
  role,
  error,
  submit,
  item,
  title,
  body,
}) => {
  const initiallinks = [
    {
      media: 'facebook',
      link: '',
    },
    {
      media: 'x',
      link: '',
    },
    {
      media: 'instagram',
      link: '',
    },
    {
      media: 'youtube',
      link: '',
    },
  ];
  const initialState = {
    campaignID: item._id,

    description: '',
    links: initiallinks,
  };
  const [links, setLinks] = useState<any>(initiallinks);

  const [submissionitem, setItem] = useState(initialState);
  const handleChange = (e: any, name: any) => {
    setItem((prev) => ({
      ...prev,
      [name]: e,
    }));
  };
  const handleChangeOnMediaLinks = (e: any, name: any) => {
    setItem((prev) => ({
      ...prev,
      [name]: e,
    }));
  };

  // const updateItem = (e: any, name: any, id: any) => {
  //     console.log(name)
  //     let Newlinks = links
  //     let oldObje = links[name]
  //     oldObje.link = e
  //     console.log(oldObje)
  //     // Newlinks
  //     setList( // Replace the state
  //         [ // with a new array
  //             ...links, // that contains all the old items
  //             // and one new item at the end
  //         ]
  //     );

  //     updatedPersons.push({ id: 2, name: "Jane", age: 28 });
  //     // setLinks((prevItems: any) =>
  //     //     prevItems.map((item: any) =>
  //     //         item.id === id
  //     //             ? { ...item, link: e }  // Update the specific item
  //     //             : item  // Keep the rest unchanged
  //     //     )
  //     // );
  // };
  const updateItem = (e: any, newLink: any) => {
    setItem((prevCampaign) => ({
      ...prevCampaign,
      links: prevCampaign.links.map(
        (link) =>
          link.media === newLink
            ? { ...link, link: e } // Update the link for youtube
            : link, // Keep the other links unchanged
      ),
    }));
  };
  console.log(submissionitem);
  const LaunchCampaign = async (text: any) => {
    try {
      await instance.put(`campaign/${item._id}`, { state: text });
      await fetchData();
      toast.success('Campaign Successfully Launched');
      cancel();
    } catch (error) {}
  };
  const SubmitToCampaign = async () => {
    try {
      await instance.post(`submissions`, submissionitem);
      await fetchData();
      toast.success('Campaign Successfully Launched');
      cancel();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Unknown Error Occured please ty again later');
      }
    }
  };

  const date1: any = new Date(item.start);
  const date2: any = new Date(item.end);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const approve = async (word: any, id: any) => {
    try {
      const response = await instance.put(`submissions/${id}`, { approved: word });
      await fetchData();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Unknown Error Occured please ty again later');
      }
    }
  };
  return (
    <div
      className={`fixed right-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-60`}
    >
      <div className="h-[90vh] w-[50vw] min-w-[800px] rounded-md bg-white px-1 shadow-md">
        <div className="flex w-full">
          <div className="flex w-[98%] items-center justify-center border-b"></div>
          <div className="flex w-[5%] items-center justify-center">
            <div
              onClick={cancel}
              className="flex size-10 items-center justify-center rounded-full border"
            >
              <h1 className="my-2 text-center text-lg font-bold uppercase text-[#650cae]">X</h1>
            </div>
          </div>
        </div>

        <div className="flex h-[90%] w-full">
          <div
            className={`flex ${item.state === 'launched' && role !== 'campaigner' ? 'w-2/3' : 'w-[100%] px-20'} h-full flex-col bg-white`}
          >
            <div className="flex h-10 w-[98%] items-center justify-center">
              <h1 className="my-2 text-center text-lg font-bold uppercase text-[#650cae] text-blue-400">
                {item.name}
              </h1>
            </div>
            <div className="flex px-4">
              <p>
                <h1 className="] font-bold text-slate-400">{item.description}</h1>
              </p>
            </div>
            <div className="mb-2 flex h-10 w-full gap-x-2 bg-slate-100 px-10">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Duration {diffDays} Days
              </div>
            </div>
            <div className="mb-2 flex h-10 w-full gap-x-2 bg-slate-100 px-10">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                start Date {item.start}
              </div>
            </div>
            <div className="mb-2 flex h-10 w-full gap-x-2 bg-slate-100 px-10">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                End Date {item.end}
              </div>
            </div>
            <div className="mb-2 flex h-10 w-full gap-x-2 bg-slate-100 px-10">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                  />
                </svg>
                Campaign launch state:
                {item.state}
              </div>
            </div>
            <div className="flex py-10">
              <Table
                noAction={false}
                action={approve}
                state="Submissions"
                key_column="name"
                role={role}
                columns={[
                  { Header: 'description', accessor: 'description' },
                  { Header: 'state', accessor: 'approved' },
                  { Header: 'Platforms', accessor: 'links' },
                ]}
                title=""
                data={item.submissions}
              />
            </div>
            {item.state === 'scheduled' && (
              <div className={`flex h-10 w-full items-center justify-end`}>
                <div
                  onClick={() =>
                    LaunchCampaign(item.state === 'scheduled' ? 'launched' : 'completed')
                  }
                  className={`flex items-center justify-center rounded-md border px-2 py-1 ${item.state === 'scheduled' ? 'bg-blue-400 hover:bg-blue-100' : 'bg-[#22c55e] hover:bg-blue-100'} cursor-pointer shadow-2xl hover:text-slate-500`}
                >
                  {item.state === 'scheduled' ? 'Launch' : 'Complete'}
                </div>
              </div>
            )}
            {item.state === 'launched' && (
              <div className={`flex h-10 w-full items-center justify-end`}>
                <div
                  onClick={() => LaunchCampaign('completed')}
                  className="flex cursor-pointer items-center justify-center rounded-md border bg-[#22c55e] px-2 py-1 shadow-2xl hover:bg-blue-100 hover:text-slate-500"
                >
                  Completed
                </div>
              </div>
            )}
          </div>
          {item.state === 'launched' && role !== 'campaigner' && (
            <div className="flex h-full w-1/3 flex-col gap-y-2 bg-slate-50 px-2 py-4">
              <div className="flex items-center gap-x-2 font-bold text-slate-500">
                Posted To
                {SocialMediaArray.map((data) => (
                  <SocialButton key={data.icon} media="X" color={data.color} icon={data.icon} />
                ))}
              </div>
              <div className="flex">
                <TextArea
                  required
                  name="description"
                  placeholder="Description"
                  value={submissionitem.description}
                  onChange={handleChange}
                />
              </div>
              {SocialMediaArray?.map((listitem: any, id: any) => (
                <Input
                  key={id}
                  label={listitem?.media}
                  placeholder={`${listitem.media} link`}
                  required
                  name={listitem?.media}
                  value={submissionitem?.links[listitem?.media]}
                  onChange={(e: any) => updateItem(e, listitem.media)}
                />
              ))}
              <div className="mt-5 flex justify-between px-5">
                <button
                  className="rounded-md bg-[#101f20] px-4 py-2 text-white outline outline-1 outline-[#101f20] hover:bg-transparent hover:text-black"
                  onClick={() => {}}
                >
                  {' '}
                  Cancel
                </button>
                <button
                  className="rounded-md bg-green-500 px-4 py-2 text-black outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white"
                  onClick={() => SubmitToCampaign()}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
