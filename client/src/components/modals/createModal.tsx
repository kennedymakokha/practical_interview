/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreateModalProps {
  setPopUp?: any;
  cancel?: any;
  error?: any;
  submit?: any;
  item?: any;
  title?: string;
  body: any;
}
const Create_Modal: React.FC<CreateModalProps> = ({
  setPopUp,
  cancel,
  error,
  submit,
  item,
  title,
  body,
}) => {
  return (
    <div
      className={`h-screen w-screen ${error ? 'gap-y-10 bg-black bg-opacity-90' : 'bg-black bg-opacity-60'} fixed right-0 top-0 flex flex-col items-center justify-center`}
    >
      <h2 className="font-bold text-red-500">{error}</h2>
      <div className="min-w-[800px] rounded-md bg-white p-10 shadow-md">
        <h1 className="my-5 text-center text-lg font-bold uppercase text-[rgb(101,12,174)]">
          {title}
        </h1>
        {body}
        <div className="mt-5 flex justify-between">
          <button
            className="rounded-md bg-[#101f20] px-4 py-2 text-white outline outline-1 outline-[#101f20] hover:bg-transparent hover:text-black"
            onClick={() => {
              setPopUp(false);
              cancel();
            }}
          >
            {' '}
            Cancel
          </button>
          <button
            className="rounded-md bg-green-500 px-4 py-2 text-black outline outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white"
            onClick={submit}
          >
            {item?._id ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create_Modal;
