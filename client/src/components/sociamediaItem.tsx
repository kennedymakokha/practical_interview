/* eslint-disable @typescript-eslint/no-explicit-any */

const SocialButton = ({ color, icon, AddsocialMedia }: string | number | any) => {
  return (
    <button
      onClick={AddsocialMedia}
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      className="flex size-8 items-center justify-center rounded-full text-xs font-medium uppercase leading-normal text-white"
      style={{ backgroundColor: color }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d={icon} />
      </svg>
    </button>
  );
};
export default SocialButton;
