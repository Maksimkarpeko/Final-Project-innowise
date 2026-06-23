type CvProjectChipsProps = {
    items: string[];
    maxVisible?: number;
};

export const CvProjectChips = ({
                                   items,
                                   maxVisible = 4,
                               }: CvProjectChipsProps) => {
    if (!items.length) {
        return null;
    }

    const visibleItems = items.slice(0, maxVisible);
    const hiddenCount = items.length - visibleItems.length;

    return (
        <div className="flex flex-wrap gap-2">
            {visibleItems.map((item) => (
                <span
                    key={item}
                    className="max-w-[260px] truncate rounded-[16px] bg-[#F0F0F0] px-3 py-[3px] font-roboto text-[13px] font-normal leading-[18px] text-[#767676]"
                    title={item}
                >
                    {item}
                </span>
            ))}

            {hiddenCount > 0 && (
                <span className="rounded-[16px] bg-[#F0F0F0] px-3 py-[3px] font-roboto text-[13px] font-normal leading-[18px] text-[#767676]">
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};