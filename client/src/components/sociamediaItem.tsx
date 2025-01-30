

const SocialButton = ({ color, icon, AddsocialMedia }: String | Number | any) => {
    return (
        <button
            onClick={AddsocialMedia}
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="flex  size-8 items-center justify-center text-xs font-medium 
uppercase leading-normal text-white
rounded-full "
            style={{ backgroundColor: color }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d={icon} />
            </svg>

        </button>
    )

}
export default SocialButton