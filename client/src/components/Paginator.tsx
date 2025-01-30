
interface PageProps {
    count: Number,
    page: Number;
    setFilter: any
    filter: any
}
export const Paginator: React.FC<PageProps> = ({ count, page, setFilter, filter }) => {
    const repeatedElements = [...Array(count)].map((_, i) => (
        <div key={i}>
            <div onClick={() => setFilter((prev: any) => ({ ...prev, page: i + 1 }))} className={`w-5 cursor-pointer text-[10px] h-7 border ${i + 1 === filter.page && "bg-slate-200"} flex items-center  justify-center`}>
                {i + 1}
            </div>
        </div>
    ))
    return repeatedElements

}